import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  constructor(private http: HttpClient) {}

  getTranslations(locale: string): Observable<any> {
    return this.http.get<any>(`assets/locales/${locale}.json`).pipe(
      map((data) => data.card.productsList)
    );
  }
  
  getDonationTranslations(locale: string): Observable<any> {
    return this.http.get<any>(`assets/locales/${locale}.json`).pipe(
      map((data) => data.card.productsList)
    );
  }

  mapDonationsWithNeedId(
    donations: any[],
    productsList: any[],
    locale: string
  ): any[] {
    const translationKey = 'productsList';
    if (!productsList) {
      console.error('Products list not found');
      return donations;
    }
  
    const products = productsList[translationKey];
    if (!products) {
      console.error(`Translations not found for key: ${translationKey}`);
      return donations;
    }
  
    // Map donations with item_id
    return donations.map((donation) => {
      const product = products.find((p) => p.item_id === donation.item_id);
      if (product) {
        return { ...donation, ...product };
      } else {
        return donation;
      }
    });
  }

}
