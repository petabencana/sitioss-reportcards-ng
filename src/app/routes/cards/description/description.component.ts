import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../../app/services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  constructor(
    public deckService: DeckService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.deckService.userCanBack()
    this.deckService.userCanContinue()
  }

  getDescription(){
    switch(this.deckService.getDeckSubType()){
      case 'volcanic':
        return `card.volcanodescription`;
        break;
      case 'smog':
        return `card.smogdescription`;
        break;   
      case 'road':
        return `card.roaddescription`;
        break;
      case 'structure':
        return `card.structuredescription`;
        break;
      case 'wind':
        return `card.winddescription`;
        break;
      case 'storm':
        return `card.stormdescription`;
        break;
      default :
        return `card.flooddescription`;
        break; 
    }
  }
}
