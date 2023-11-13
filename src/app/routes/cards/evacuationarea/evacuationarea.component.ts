import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DeckService } from '../../../services/cards/deck.service';
import { NavigationService } from '../../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-evacuationarea',
  templateUrl: './evacuationarea.component.html',
  styleUrls: ['./evacuationarea.component.scss']
})
export class EvacuationareaComponent implements OnInit {
  get selectedOption(): null | boolean {
    return this.deckService.getEvacuationArea()
  }

  constructor(
    public deckService: DeckService,
    public navController: NavigationService,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.deckService.userCanBack()

    this.isUserAbleToContinue()
  }

  getEvacuation() {
    if(this.deckService.getDeckType() === 'typhoon'){
      return `card.evacuation.typhoondescription`;
    } else if(this.deckService.getDeckType() === 'earthquake'){
      return `card.evacuation.description`;
    } else if(this.deckService.getDeckType() === 'volcano'){
      return `card.evacuation.description`;
    }

  }

  isUserAbleToContinue() {
    // If user not select anything yet, next button is disabled
    if (this.deckService.getEvacuationArea() !== null) {
      this.deckService.userCanContinue()
    } else {
      this.deckService.userCannotContinue()
    }
  }

  onOptionClick(option: boolean) {
    this.deckService.setEvacuationArea(option)

    setTimeout(() => {
      this.navController.next(this.deckService.getRoute())
    }, 500)
  }
}
