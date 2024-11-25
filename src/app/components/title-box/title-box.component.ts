import { Component, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { DeckService } from '../../services/cards/deck.service';
import * as $ from 'jquery';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-title-box",
  templateUrl: "./title-box.component.html",
  styleUrls: ["./title-box.component.scss"],
})
export class TitleBoxComponent {
  @Input() title: string;
  partnerCode = "";
  isError: boolean = false; // hidden by default
  isPartner: boolean = false; // hidden by default
  isShown: boolean = false; // hidden by default
  partnerIcon:string = ""
  partnerText:string = ""
  navIcon:string = "../assets/nav/partnerIcon.svg"
  isNotification = false



  constructor(
    public navController: NavigationService,
    public deckService: DeckService,
    public translate: TranslateService,

  ) {}

  ngOnInit() {
    if( this.deckService.getDeckType() === 'notifications' || this.deckService.getDeckType() === 'need' || this.deckService.getDeckType() === 'giver'){
      this.isNotification = true
    } else {
      this.isNotification = false
    }
  }

  getCssClass(i) {
    if (this.deckService.getDeckType() === "earthquake") {
      return i < this.navController.tabs[1] ? "tabs filled " : "tabs";
    }
    return i <= this.navController.tabs[1]
      ? this.isPartner
        ? "tabs filled_partner"
        : "tabs filled "
      : "tabs";
  }

  get isShowTabs(): boolean {
    if (this.deckService.getDeckType() === "earthquake") {
      return (
        this.navController.tabs[1] > 0 &&
        this.navController.tabs[1] <= this.totalTabs.length
      );
    }
    return this.navController.tabs[1] < this.totalTabs.length;
  }

  get partnerModeTitle(): string {
    return this.translate.instant('partner_mode_title');
  }

  get partnerModeBody1(): string {
    return this.translate.instant('partner_mode_body1');
  }

  get partnerModeBody2(): string {
    return this.translate.instant('partner_mode_body2');
  }

  get partnerModeBody3(): string {
    return this.translate.instant('partner_mode_body3');
  }

  get partnerModePlaceHolder(): string {
    return this.translate.instant('partner_mode_placeholder');
  }

  get partnerModeForgotPassword(): string {
    return this.translate.instant('forgot_partner_code');
  }

  get partnerModeCTA(): string {
    return this.translate.instant('partner_mode_cta');
  }

  get partnerModeLoginHeader(): string {
    return this.translate.instant('partner_mode_loginHeader');
  }

  get partnerModeLoginSubHeader(): string {
    return this.translate.instant('partner_mode_loginSubHeader');
  }

  get partnerModeCodeNotFound(): string {
    return this.translate.instant('partner_mode_partnerNotfound');
  }

  get forgotPartnerModeEmail(): string {
    return this.translate.instant('forgot_partner_email');
  }

  get forgotPartnerModeSubject(): string {
    return this.translate.instant('forgot_partner_subject');
  }

  get forgotPartnerModeBody(): string {
    return this.translate.instant('forgot_partner_body');
  }

  get totalTabs(): number[] {
    let offset;
    if (this.deckService.getDeckType() === "earthquake") {
      offset = 2;
    } else {
      offset = 1;
    }

    return Array(this.navController.tabs[0] - offset)
      .fill(1)
      .map((x, i) => x + i);
  }

  closePartnerPopup() {
    this.isShown = false;
  }

  showPartnerPopup() {
        this.isShown = true;
  }

fetchPartnerName(){
  this.deckService
    .verifyPartnerCode(<string>$("#partnerCode").val())
    .then((response) => {
      let partnerImage = response[0]['partner_icon'].split("?")
      this.partnerText = response[0]['partner_text']
      this.partnerIcon = partnerImage[0]
      setTimeout(() => {this.partnerIcon = "" }, 3000)
    })
    .catch((err) => {
      this.isError = true;
    });
}

  submitCode() {
    this.deckService
      .verifyPartnerCode(<string>$("#partnerCode").val())
      .then((response) => {
        this.closePartnerPopup();
        this.isPartner = true;
        this.fetchPartnerName()
      })
      .catch((err) => {
        this.isError = true;
      });
  }
}
