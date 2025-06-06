import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as topojson from 'topojson-client';


type deckType =
  | 'fire'
  | 'earthquake'
  | 'wind'
  | 'haze'
  | 'volcano'
  | 'flood'
  | 'notifications'
  | 'need'
  | 'giver';

type deckSubType =
  | 'fire'
  | 'haze'
  | 'road'
  | 'structure'
  | 'wind'
  | 'volcano'
  | 'flood'
  | 'need'
  | 'giver';

  type TrainingWords = ["trainer", "duta", "dkrb", "youth", "tes", "test", "simulasi", "HKB"];

interface LatLng {
  lat: number;
  lng: number;
}

interface Subscription {
  subscription_id: string;
  region_code: string;
}

interface Address {
  address: string;
  city: string;
  province: string;
  postal: string;
  notes: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private partnerCode: string;

  constructor(private http: HttpClient) {}
  finishedSubType = [];
  cardLanguage = '';
  trainingWords: string[] = ["trainer", "duta", "dkrb", "youth", "tes", "test", "simulasi", "HKB"];

  tweetID: string;
  waNumber: string;
  requestId: string;
  isError: 'server-error' | 'same-region-select' | 'no-whatsapp-number' | boolean = false;
  type: deckType;
  subType: deckSubType;

  route: ActivatedRoute;

  structureFailure: number | undefined = undefined;
  impact: number | undefined = undefined;
  visibility: number | undefined = undefined;
  airQuality: number | undefined = undefined;
  accessibility: number | undefined = undefined;
  condition: number | undefined = undefined;
  location: LatLng;
  floodDepth: number;
  fireLocation: LatLng;
  fireRadius: LatLng;
  fireDistance: number;
  selectedRegion: string[];
  selectedRegionCode: string[];
  volcanicSigns: number[] = [];
  evacuationNumber: null | number = null;
  evacuationArea: null | boolean = null;
  imageSignedUrl = 'url_error';
  description = '';
  inputValue = [];
  sub_submission = false;
  captchaCleared = false;
  preview: File;
  modalOpen = false;
  isPrevButtonDisabled = true;
  isNextButtonDisabled = true;
  reportType = '';
  giverData: any[];
  translatedData: any[];
  address = {};
  inputAddess = [];
  fileType = '';
  setImage = false;
  totalClicks: number;

  getGiverCards(): any[] {
    return this.giverData;
  }

  getTranslatedData(): any[] {
    return this.translatedData;
  }

  // Method to set translated data in the state
  setTranslatedData(data: any[]): void {
    this.translatedData = data;
  }

  setGiverData(data: any[]): void {
    this.giverData = data;
  }

  selectedProducts: {
    title: string;
    quantity: number;
    category: string;
    description: string;
    img: string;
    units: string;
    item_id: string;
    need_id: number;
    donate?: number;
    limit?: number;
    hasDescription?: boolean;
    totalUserDonated?: number;
  }[] = [];

  getSelectedProducts(title: string) {
    return this.selectedProducts.find((product) => product.title === title);
  }

  setSelectedProducts(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string,
    units: string,
    item_id: string,
    hasDescription: boolean,
    need_id?: number,
    donate?: number,
    limit?: number,
    totalUserDonated?: number
  ) {
    if (quantity === 0) {
      this.selectedProducts = this.selectedProducts.filter(
        (product) => product.item_id !== item_id
      );
    } else {
      const index = this.selectedProducts.findIndex(
        (product) => product.item_id === item_id
      );

      if (index !== -1) {
        this.selectedProducts[index].quantity = quantity;
        this.selectedProducts[index].category = category;
        this.selectedProducts[index].description = hasDescription ? description : "";
        this.selectedProducts[index].img = img;
        this.selectedProducts[index].units = units;
        this.selectedProducts[index].item_id = item_id;
        this.selectedProducts[index].need_id = need_id;
        this.selectedProducts[index].donate = donate;
        this.selectedProducts[index].limit = limit;
        this.selectedProducts[index].hasDescription = hasDescription;
        this.selectedProducts[index].totalUserDonated = totalUserDonated;
      } else {
        this.selectedProducts.push({
          title,
          quantity,
          category,
          description: hasDescription ? description : "",
          img,
          units,
          item_id,
          need_id,
          donate,
          limit,
          hasDescription,
          totalUserDonated
        });
      }
    }
  }

  countryCode: string;
  contactNumber: string;
  countryName: string;

  getCountryCode() {
    return this.countryCode;
  }

  getCountryName() {
    return this.countryName;
  }

  setCountryCode(code: string) {
    this.countryCode = code;
  }
  setCountryName(countryName: string) {
    this.countryName = countryName;
  }
  getContactNumber() {
    return this.contactNumber;
  }

  setContactNumber(number: string) {
    this.contactNumber = number;
  }

  donationDate: string;
  donationTime: string;

  getDonationdate() {
    return this.donationDate;
  }

  setDonationdate(date: string) {
    this.donationDate = date;
  }

  getDonationtime() {
    return this.donationTime;
  }

  setDonationtime(time: string) {
    this.donationTime = time;
  }

  userCanBack() {
    this.isPrevButtonDisabled = false;
  }

  userCannotBack() {
    this.isPrevButtonDisabled = true;
  }

  selectReportType(type: string) {
    this.reportType = type;
  }

  userCanContinue() {
    this.isNextButtonDisabled = false;
  }

  userCannotContinue() {
    this.isNextButtonDisabled = true;
  }


  async isPermittedLocation() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Access-Control-Allow-Origin', '*');

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.location.lat}&lon=${this.location.lng}`
    );

    const geocodeData = await response.json();

    return geocodeData.address.country_code === env.country_code;
  }

  async fetchAddress() {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Access-Control-Allow-Origin', '*');

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.location.lat}&lon=${this.location.lng}`
    );

    const geocodeData = await response.json();

    return geocodeData.address;
  }


  // Getter
  getDeckType() {
    return this.type;
  }
  getDeckSubType() {
    return this.subType;
  }

  getRoute() {
    return this.route;
  }

  getReportType() {
    return this.reportType;
  }

  getStructureFailure() {
    return this.structureFailure;
  }
  getImpact() {
    return this.impact;
  }
  getVisibility(): number {
    return this.visibility;
  }
  getAirQuality(): number {
    return this.airQuality;
  }
  getAccessibility() {
    return this.accessibility;
  }
  getCondition() {
    return this.condition;
  }
  getLocation() {
    return this.location;
  }
  getFloodDepth() {
    return this.floodDepth;
  }
  getFireLocation(): LatLng {
    return this.fireLocation;
  }
  getFireRadius(): LatLng {
    return this.fireRadius;
  }
  getFireDistance(): number {
    return this.fireDistance;
  }
  getVolcanicSigns(): number[] {
    return this.volcanicSigns;
  }
  getEvacuationNumber(): null | number {
    return this.evacuationNumber;
  }
  getEvacuationArea(): null | boolean {
    return this.evacuationArea;
  }
  getCardLanguage(): string {
    return this.cardLanguage;
  }

  isCaptchaCleared(): boolean {
    return this.captchaCleared;
  }

  isModalOPen(): boolean {
    return this.modalOpen;
  }
  getDescription() {
    return this.description;
  }

  getInputValue() {
    return this.inputValue;
  }

  getPreview() {
    return this.preview;
  }

  getSelectedRegion() {
    return this.selectedRegion;
  }

  getSelectedRegionCode() {
    return this.selectedRegionCode;
  }

  getIsError() {
    return this.isError;
  }

  getInputAddress() {
    return this.inputAddess;
  }

  // Setter

  setDeckType(type: deckType) {
    this.type = type;
  }

  setDeckSubType(subType: deckSubType) {
    this.subType = subType;
  }

  setRoute(route: ActivatedRoute) {
    this.route = route;
  }

  setSelectedRegion(selectedRegion: string[]) {
    this.selectedRegion = selectedRegion;
  }

  setSelectedRegionCode(selectedRegionCode: string[]) {
    this.selectedRegionCode = selectedRegionCode;
  }

  setStructureFailure(structureFailure: number) {
    this.structureFailure = structureFailure;
  }
  setImpact(impact: number) {
    this.impact = impact;
  }
  setVisibility(visibility: number) {
    this.visibility = visibility;
  }
  setAirQuality(airQuality: number) {
    this.airQuality = airQuality;
  }
  setAccessibility(accessibility: number) {
    this.accessibility = accessibility;
  }
  setCondition(condition: number) {
    this.condition = condition;
  }
  setLocation(location: LatLng) {
    this.location = location;
  }
  setFloodDepth(floodDepth: number) {
    this.floodDepth = Math.round(floodDepth);
  }
  setFireLocation(fireLocation: LatLng) {
    this.fireLocation = fireLocation;
  }
  setFireRadius(fireRadius: LatLng) {
    this.fireRadius = fireRadius;
  }
  setFireDistance(fireDistance: number) {
    this.fireDistance = fireDistance;
  }
  setVolcanicSigns(volcanicSigns: number[]) {
    this.volcanicSigns = volcanicSigns;
  }
  setTwitterID(tweetID: string) {
    if (tweetID) {
      this.tweetID = tweetID;
    }
  }
  setAddress(address: Address) {
    if(address) {
      this.address = {...address};
    }
  }
  setInputAddress(data: any): void {
    this.inputAddess = [data]
  }
  setWaNumber(waNumber: string) {
    if (waNumber) {
      this.waNumber = waNumber;
    }
  }
  setRequestId(requestId: string) {
    if (requestId) {
      this.requestId = requestId;
    }
  }
  setEvacuationNumber(evacuationNumber: number) {
    if (this.evacuationNumber !== evacuationNumber) {
      this.evacuationNumber = evacuationNumber;
    } else {
      this.evacuationNumber = null;
    }
  }
  setEvacuationArea(evacuationArea: boolean) {
    this.evacuationArea = evacuationArea;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setSubSubmission() {
    this.sub_submission = true;
  }
  setCardLanguage(lang: string) {
    this.cardLanguage = lang;
  }


  setInputValue(name: string, inputValue: string) {
    switch (name) {
      case 'facebook':
        this.inputValue.push({ name: name, value: inputValue });
        break;
      case 'twitter':
        this.inputValue.push({ name: name, value: inputValue });
        break;
      case 'telegram':
        this.inputValue.push({ name: name, value: inputValue });
        break;
      case 'whatsapp':
        this.inputValue.push({ name: name, value: inputValue });
        break;
      case 'instagram':
        this.inputValue.push({ name: name, value: inputValue });
        break;
      default:
        break;
    }
  }

  setPreview(preview: File) {
    this.preview = preview;
  }
  setCaptchaNotCleared() {
    this.captchaCleared = false;
  }
  setCaptchaCleared() {
    this.captchaCleared = true;
  }

  setModalOpen() {
    return this.modalOpen = true;
  }
  setModalNotOpen() {
    return this.modalOpen = false;
  }

  setImageUrl() {
    return this.setImage = true;
  }

  reset() {
    this.finishedSubType.push(this.subType);

    this.impact = undefined;
    this.structureFailure = undefined;
    this.visibility = undefined;
    this.airQuality = undefined;
    this.accessibility = undefined;
    this.condition = undefined;
    this.location = undefined;
    this.fireLocation = undefined;
    this.fireRadius = undefined;
    this.fireDistance = undefined;
    this.volcanicSigns = [];
    this.evacuationNumber = null;
    this.evacuationArea = null;
    this.description = '';
    this.preview = undefined;
    this.captchaCleared = false;
    this.imageSignedUrl = 'url_error';
    this.partnerCode = '';
    this.modalOpen = false;
    this.isError = false;
  }

  updateSignedUrl(image: File) {
    const cardId = this.route.snapshot['_routerState'].url.split('/')[1];
    this.fileType = image.type.split('/')[1].split('+')[0]
    this.getSignedURL(cardId, image.type)
      .then((signedURL) => (this.imageSignedUrl = signedURL))
      .catch((error) => {
        this.imageSignedUrl = 'url_error';
      });
  }

  getSignedURL(id: string, type: string): Promise<string> {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._getSignedUrl(id, type).subscribe(
        (responseData) => {
          resolve(responseData.signedRequest);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  _getSignedUrl(id: string, type: string): Observable<any> {
    return this.http.get(env.data_server + 'cards/' + id + '/images', {
      headers: { 'content-type': type },
    });
  }

  async submitNotificationRequest(): Promise<any> {
    const selectedRegion = this.getSelectedRegion();
    const languageCode = this.getCardLanguage();
    const notifyMedium = this.waNumber;
    const data = {
      regions: selectedRegion,
      userId: notifyMedium,
      language: languageCode,
    };
    return new Promise(async (resolve, reject) => {
      return await this.http
        .post(`${env.data_server}subscriptions/add-subscriber`, data)
        .toPromise()
        .then((success) => {
          // PUT report & patch image_url
          resolve(success);
        })
        .catch((err) => {
          reject(err);
          this.isError = err.error.code;
        });
    });
  }

  async submitNeedRequest(): Promise<any> {
    const need_data = [];
    const languageCode = this.getCardLanguage()
      ? this.getCardLanguage()
      : 'id';
    const contactNumber = this.waNumber;
    const timestamp = Date.now();
    
    this.selectedProducts.map((item) => {
      need_data.push({
        status: 'ACTIVE',
        quantity_requested: item.quantity,
        item_requested: item.title,
        need_language: languageCode,
        user_id: contactNumber,
        need_request_id: `${contactNumber.slice(
          -4
        )}-${languageCode}-${timestamp}`,
        platform: 'whatsapp',
        user_type: this.getDeckSubType(),
        units: item.units,
        item_id: item.item_id,
        description: item.hasDescription ? {[item.item_id] : item.description} : '',
        lng: this.location.lng,
        lat: this.location.lat,
        is_training: this.getReportType() === 'training',
        address: this.address
      });
    });


    return new Promise(async (resolve, reject) => {
      return await this.http
        .post(`${env.data_server}needs/create-need`, need_data)
        .toPromise()
        .then((success) => {
          // PUT report & patch image_url
          resolve(success);
        })
        .catch((error) => {
          reject(error);
          console.log('Error', error);
          // PUT report & notify user about upload error
        });
    });
  }

  async submitGiverRequest(): Promise<any> {
    const giver_data = [];
    const languageCode = this.getCardLanguage()
      ? this.getCardLanguage()
      : 'id';

    this.selectedProducts.map((item) => {
      giver_data.push({
        quantity_satisfied: item.donate,
        item_satisfied: item.title,
        giver_language: languageCode,
        user_id: this.countryCode + this.contactNumber,
        platform: 'whatsapp',
        user_type: this.getDeckSubType(),
        need_id: item.need_id,
        promised_date: this.donationDate,
        promised_time: this.donationTime,
        delivery_code: 'code-' + this.selectedProducts.map(prod => prod.need_id).join('-')
      });
    });


    return new Promise(async (resolve, reject) => {
      return await this.http
        .post(`${env.data_server}needs/update-giver`, giver_data)
        .toPromise()
        .then((success) => {
          resolve(success);
        })
        .catch((error) => {
          reject(error);
          console.log('Error', error);
          // PUT report & notify user about upload error
        });
    });
  }

  async submit(): Promise<any> {
    const signedURL = this.imageSignedUrl;
    const cardId = this.route.snapshot['_routerState'].url.split('/')[1];
    const report = this._get_report_summary();
    // conditionally add properties to the report depending on the current deck type

    if (this.preview && signedURL) {
      const photo = this.preview;
      if (signedURL === 'url_error') {
        // PUT report & notify user about upload error
        return this.putReport(report, cardId, true, false);
      } else {
        // PUT photo in S3 bucket using signedURL
        return await this.http
          .put(signedURL, photo)
          .toPromise()
          .then((success) => {
            // PUT report & patch image_url
            return this.putReport(report, cardId, true, true);
          })
          .catch((error) => {
            // PUT report & notify user about upload error
            return this.putReport(report, cardId, true, false);
          });
      }
    } else {
      // PUT report & proceed to thanks
      return this.putReport(report, cardId, false, false);
    }
  }

  containsTrainingWord(str) {
    const words = this.trainingWords;
    for (const word of words) {
      if (str.toLowerCase().includes(word.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  _get_report_summary(): any {
    const cardId = this.route.snapshot['_routerState'].url.split('/')[1];
    const summary: any = {
      disaster_type: this.type,
      card_data: {
        report_type: this.subType,
      },
      sub_submission: this.sub_submission,
      text: this.description,
      created_at: new Date().toISOString(),
      image_url: this.setImage ? cardId : '',
      location: this.location,
      partnerCode: this.partnerCode ? this.partnerCode : '',
      is_training : this.getReportType() === 'training' || this.containsTrainingWord(this.description)
    };
    if (this.tweetID) {
      summary.tweetID = this.tweetID;
    }
    switch (this.type) {
      case 'flood':
        summary.card_data.flood_depth = this.floodDepth;
        break;
      case 'wind':
        summary.card_data.impact = this.impact;
        break;
      case 'fire':
        summary.card_data.fireDistance = this.fireDistance;
        summary.card_data.fireLocation = this.fireLocation;
        summary.card_data.personLocation = this.location;
        summary.card_data.fireRadius = this.fireRadius;
        summary.location = this.fireLocation;
        break;
      case 'volcano':
        summary.card_data.volcanicSigns = this.volcanicSigns;
        summary.card_data.evacuationNumber = this.evacuationNumber;
        summary.card_data.evacuationArea = this.evacuationArea;
        break;
      case 'haze':
        summary.card_data.visibility = this.visibility;
        summary.card_data.airQuality = this.airQuality;
        break;
      case 'earthquake':
        if (this.subType == 'structure') {
          summary.card_data.structureFailure = this.structureFailure;
        } else if (this.subType == 'road') {
          summary.card_data.accessabilityFailure = this.accessibility;
        }
        summary.card_data.condition = this.condition;
        break;
    }
    return summary;
  }
  putReport(
    report: any,
    id: any,
    hasPhoto: boolean,
    photoUploaded: boolean
  ): Promise<any> {
    const reportURL = env.data_server + 'cards/' + id;
    // Define route settings pointers
    // var error_settings, thanks_settings;
    // for (let route of router.routes) {
    //   if (route.name === 'error') {
    //     error_settings = route.settings;
    //   }
    //   if (route.name === 'thanks') {
    //     thanks_settings = route.settings;
    //   }
    // }

    // PUT reportcard data
    return new Promise<void>((resolve, reject) =>
      this.http.put(reportURL, report).subscribe(
        (data) => {
          if (hasPhoto && photoUploaded) {
            // If photo uploaded successfully, patch image_url
            this.http
              .patch(reportURL, {
                // TODO: match server patch handler
                image_url: id,
                image_type: this.fileType,
              })
              .subscribe(
                (patch_success) => {
                  // Proceed to thanks page
                  // thanks_settings.code = 'pass';
                  // router.navigate('thanks');
                  resolve();
                },
                (patch_error) => {
                  // Proceed to thanks page with image upload error notification
                  // thanks_settings.code = 'fail';
                  // router.navigate('thanks');
                  reject();
                }
              );
          } 
          else if (hasPhoto && !photoUploaded) {
            // Proceed to thanks page with image upload error notification
            // thanks_settings.code = 'fail';
            // router.navigate('thanks');
            resolve();
          } 
          else {
            // Proceed to thanks page
            // thanks_settings.code = 'pass';
            // router.navigate('thanks');
            resolve();
          }
        },
        (error) => {
          // error_settings.code = put_error.statusCode;
          // error_settings.msg = put_error.statusText;
          // router.navigate('error');
          this.isError = true;
          reject();
        }
      )
    );
  }

  getCitiesData() {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._getCitiesData().subscribe(
        (responseData) => {
          if (responseData.statusCode === 200) {
            let result = responseData.result;
            if (result && result.objects) {
              resolve(topojson.feature(result, result.objects.output));
            } else {
              resolve(null);
            }
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getSubscriptions() {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._getSubscribedRegions().subscribe(
        (responseData) => {
            resolve(responseData);
        },
        (err) => {
          reject([]);
        }
      );
    });
  }

  _getCitiesData(): Observable<any> {
    return this.http.get(`${env.data_server}regions`);
  }

  _getSubscribedRegions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${env.data_server}subscriptions/regions?id=${this.waNumber}`);
  }

  verifyPartnerCode(partnerCode: string) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self._verifyPartnerCode(partnerCode.toLowerCase()).subscribe(
        (responseData) => {
          if (responseData.length !== 0 && responseData[0]['partner_status']) {
            self.setPartnerCode(partnerCode.toLowerCase());
            resolve(responseData);
          } else reject('Partner Not found');
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  _verifyPartnerCode(partnerCode: string): Observable<any> {
    return this.http.get(
      env.data_server + 'partners/partner/?partner_code=' + partnerCode,
      {}
    );
  }

  setPartnerCode(partnerCode: string) {
    this.partnerCode = partnerCode;
  }
}
