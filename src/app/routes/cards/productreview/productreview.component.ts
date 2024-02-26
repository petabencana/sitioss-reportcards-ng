import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.scss'],
})
export class ProductreviewComponent implements OnInit {
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
    this.deckService.setCaptchaNotCleared();
    this.isPermittedLocation = await this.deckService.isPermittedLocation();
    this.captchaForm = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }
  handleSuccess(event) {
    // add verification step
    this.deckService.setCaptchaCleared()
  }
  
}
