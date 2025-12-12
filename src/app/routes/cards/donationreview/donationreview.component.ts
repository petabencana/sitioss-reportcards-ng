import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donations',
  templateUrl: './donationreview.component.html',
  styleUrls: ['./donationreview.component.scss'],
})
export class DonationreviewComponent implements OnInit {
  captchaForm: FormGroup;
  isPermittedLocation = true;

  constructor(
    public deckService: DeckService,
    public translate: TranslateService,
    private formBuilder: FormBuilder
  ) {}

  async ngAfterContentInit() {
    this.deckService.userCanBack();
    this.deckService.userCanContinue();
  }
  async ngOnInit() {
    // this.deckService.userCanBack()
    // this.deckService.userCannotContinue()
    // Captcha disabled - rate limiting handled by API gateway
    this.deckService.setCaptchaCleared(); // Set as cleared since captcha is disabled
    this.isPermittedLocation = await this.deckService.isPermittedLocation();
    this.captchaForm = this.formBuilder.group({
      recaptcha: [''], // No validators required - captcha disabled
    });
  }
  handleSuccess(event) {
    // add verification step
    this.deckService.setCaptchaCleared()
  }
  
}
