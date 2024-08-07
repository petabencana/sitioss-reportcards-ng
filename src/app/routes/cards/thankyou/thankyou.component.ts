import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeckService } from '../../../services/cards/deck.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public deckService: DeckService,
  ) { }

  ngOnInit() {
  }

  get titleText() : string {
    const isError = this.deckService.getIsError()
    if(isError) { 
      return `card.thank.result.failure`
    }
    return  `card.thank.result.real`
  }

  get subTitleText() : string {
    const isError = this.deckService.getIsError()
    if(isError) { 
      return `card.thank.subscribeErrText`
    }
    return  `card.thank.subscribeText`
  }

}
