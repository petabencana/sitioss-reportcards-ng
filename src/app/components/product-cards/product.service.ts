import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translationsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public translations$: Observable<any> = this.translationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  loadTranslations(locale: string, type: 'products' | 'categories'): void {
    this.http.get<any>(`assets/locales/${locale}.json`).subscribe(data => {
      const translations = type === 'products' ? data.card.productsList : data.card.categoryList;
      this.translate.setTranslation(locale, translations);
      this.translate.use(locale);
      this.translationsSubject.next(translations);
    });
  }

  getTranslations(locale: string, type: 'products' | 'categories'): Observable<any> {
    return this.http.get<any>(`assets/locales/${locale}.json`)
      .pipe(
        map(data => type === 'products' ? data.card.productsList : data.card.categoryList)
      );
  }
}
