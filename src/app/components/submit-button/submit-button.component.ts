import { Component, Input , OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { DeckService } from '../../services/cards/deck.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: [ './submit-button.component.scss' ]
})
export class SubmitButtonComponent implements OnInit {
  isPermittedLocation = true;
  isLoading = false;
  isSumbitted = false;
  @Input() title: string
  @Input() hint: string


  constructor(
    public deckService: DeckService,
    public navController: NavigationService,
    public route: ActivatedRoute,
  ) { }
  async ngOnInit() {
    
    this.isPermittedLocation = this.navController.getCurrentRouteName() === 'summary' ? true : await this.deckService.isPermittedLocation();
  }
  
  get isDescriptionAndPhotoEmpty(): boolean {
    return !(this.deckService.getDescription() || this.deckService.getPreview());
  }

  canSubmit():boolean {
    return ((!this.isDescriptionAndPhotoEmpty && this.deckService.isCaptchaCleared() && this.isPermittedLocation) || (this.deckService.isCaptchaCleared() && this.navController.getCurrentRouteName() === 'summary'))
  }


  async submit() {
    this.isLoading = true
    if(this.navController.getCurrentRouteName() === 'summary' && !this.isSumbitted ){
      this.isSumbitted = true;
      return await this.deckService.submitNotificationRequest().then(() => {
        this.isLoading = false
        this.navController.next(this.deckService.getRoute())
      }).catch(() => {
        this.navController.next(this.deckService.getRoute())
      })
    }
    if (!this.isSumbitted) {
      this.isSumbitted = true;
      await this.deckService.submit().then(() => {
        this.isLoading = false
        this.navController.next(this.deckService.getRoute())
      }).catch(() => {
        this.isLoading = false
        this.navController.next(this.deckService.getRoute())
      })
    }
  }

}