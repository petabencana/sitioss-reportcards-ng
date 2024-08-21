import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DeckService } from '../../services/cards/deck.service';
import { NavigationService } from '../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent implements OnInit {
  isPermittedLocation = true;
  isLoading = false;
  isSumbitted = false;
  @Input() title: string;
  @Input() hint: string;

  constructor(
    public deckService: DeckService,
    public navController: NavigationService,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {}
  async ngOnInit() {
    this.isPermittedLocation =
      this.navController.getCurrentRouteName() === 'summary'
        ? true
        : await this.deckService.isPermittedLocation();
  }

  get isHasDescription(): boolean {
    return (this.deckService.selectedProducts.every((item) => {
      return (item.hasDescription !== true) || (item.description !== "")
      })  
    );
  }

  get isDescriptionAndPhotoEmpty(): boolean {
    return !(
      this.deckService.getDescription() || this.deckService.getPreview()
    );
  }

  get submitButtonLabel(): string {
    return this.translate.instant('card.needLabels.submitButtonLabel');
  }

  get submitButtonLabel1(): string {
    return this.translate.instant('card.giverLabels.submitButtonLabel');
  }
  canSubmit(): boolean {
    return (
      (!this.isDescriptionAndPhotoEmpty &&
        this.deckService.isCaptchaCleared() &&
        this.isPermittedLocation) ||
      (this.deckService.isCaptchaCleared() &&
        this.navController.getCurrentRouteName() === 'summary') ||
      (this.deckService.isCaptchaCleared() &&
        this.deckService.getDeckSubType() === 'need' &&
        this.deckService.selectedProducts.length > 0 && 
        this.isHasDescription) ||
      (this.deckService.isCaptchaCleared() &&
        this.deckService.getDeckSubType() === 'giver' &&
        this.deckService.selectedProducts.length > 0)
    );
  }

  async submit() {
    this.isLoading = true;
    if (
      this.navController.getCurrentRouteName() === 'summary' &&
      !this.isSumbitted
    ) {
      this.isSumbitted = true;
      return await this.deckService
        .submitNotificationRequest()
        .then((reponse) => {
          this.isLoading = false;
          this.navController.next(this.deckService.getRoute());
        })
        .catch(() => {
          this.navController.next(this.deckService.getRoute());
        });
    }
    if (!this.isSumbitted) {
      this.isSumbitted = true;
      await this.deckService
        .submit()
        .then(() => {
          this.isLoading = false;
          this.navController.next(this.deckService.getRoute());
        })
        .catch(() => {
          this.isLoading = false;
          this.navController.next(this.deckService.getRoute());
        });
    }
  }

  async needSubmit() {
    this.isLoading = true;
    if (
      this.navController.getCurrentRouteName() === 'productreview' &&
      !this.isSumbitted
    ) {
      this.isSumbitted = true;
      return await this.deckService
        .submitNeedRequest()
        .then((reponse) => {
          this.isLoading = false;
          this.navController.next(this.deckService.getRoute());
        })
        .catch((err) => {
          this.navController.next(this.deckService.getRoute());
        });
    }
  }

  async giverSubmit() {
    this.isLoading = true;
    if (
      this.navController.getCurrentRouteName() === 'donationreview' &&
      !this.isSumbitted
    ) {
      this.isSumbitted = true;
      return await this.deckService
        .submitGiverRequest()
        .then((reponse) => {
          this.isLoading = false;
          this.navController.next(this.deckService.getRoute());
        })
        .catch((err) => {
          this.navController.next(this.deckService.getRoute());
        });
    }
  }

  get deckType() {
    return this.deckService.getDeckSubType();
  }
}
