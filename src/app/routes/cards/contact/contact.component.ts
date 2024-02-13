import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import { HttpClient } from '@angular/common/http';

interface Country {
  alpha2Code: string;
  callingCodes: string[];
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  countryCodes: Country[] = [];
  selectedCountry: string = 'ID';
  phoneNumber: string = '';

  constructor(public deckService: DeckService, private http: HttpClient) {}

  ngOnInit() {
    this.deckService.userCanBack();
    this.deckService.userCanContinue();
    this.fetchCountryCodes();
    const defaultCountryCode = this.deckService.getCountryCode(); // Get the stored country code
    if (!defaultCountryCode) {
      this.selectedCountry = 'ID'; // Set default value to 'ID'
      this.deckService.setCountryCode('ID'); // Update the country code in the service
    } else {
      this.selectedCountry = defaultCountryCode; // Use the stored country code
    }
    this.phoneNumber = this.deckService.getContactNumber() || '';
  }

  fetchCountryCodes(): void {
    this.http
      .get<Country[]>('https://restcountries.com/v2/all')
      .subscribe((countries: Country[]) => {
        this.countryCodes = countries.filter(
          (country) => country.callingCodes.length > 0
        );
        const selectedCountryData = this.countryCodes.find(
          (country) => country.alpha2Code === this.selectedCountry
        );
        if (selectedCountryData) {
          this.selectedCountry = selectedCountryData.callingCodes[0];
        }
      });
  }

  onCountryChange(): void {
    const selectedCountryData = this.countryCodes.find((country) =>
      country.callingCodes.includes(this.selectedCountry)
    );
    if (selectedCountryData) {
      this.deckService.setCountryCode(selectedCountryData.alpha2Code);
    }
  }

  onPhoneNumberInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    const sanitizedValue = currentValue.replace(/[^\d-]/g, ''); // Replace non-digit characters with empty string
    inputElement.value = sanitizedValue; // Update input value
    this.phoneNumber = sanitizedValue; // Update component property
    this.deckService.setContactNumber(this.phoneNumber);
  }

  check() {
    console.log(
      this.deckService.getCountryCode(),
      this.deckService.getContactNumber()
    );
  }
}
