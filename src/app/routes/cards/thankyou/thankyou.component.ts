import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeckService } from '../../../services/cards/deck.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankYouComponent implements OnInit {
  isError = false;
  constructor(
    public translate: TranslateService,
    public deckService: DeckService,
    public navController: NavigationService,
  ) {
    if(this.deckService.getIsError() ===  'server-error' || this.deckService.getIsError() === 'same-region-select') {
      this.isError = true;
    }
   }

  ngOnInit() {
  }

  get titleText() : string {
    const isError = this.deckService.getIsError()
    switch(isError) {
      case 'server-error':
      case 'same-region-select':
        return `card.thank.result.failure`;
      default:
    return  `card.thank.result.real`;
  }
  }

  get subTitleText() : string {
    const isError = this.deckService.getIsError()
    console.log("🚀 ~ Error message in thank you component:", isError)
    switch(isError) {
      case 'server-error':
        return `card.thank.subscribeErrText`;
      case 'same-region-select':
        return `card.thank.subscribeSameRegionErr`;
      default:
    return  `card.thank.subscribeText`;
  }
  }


  reportAnotherCard() {
      this.deckService.reset()
      this.navController.reset(this.deckService.getRoute());
    }

  }
  