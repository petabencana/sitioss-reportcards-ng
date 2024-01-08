// card.component.ts
import { Component, Input } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class CardComponent {
  quantity: number = 0;

  cards = [
    { title: 'Water', description: '5L hot/cold water' },
    { title: 'Food', description: 'Veg/Nonveg' },
    { title: 'Food', description: 'Veg/Nonveg' },
    { title: 'Food', description: 'Veg/Nonveg' },
  ];
  constructor( public deckService: DeckService ){}

//   cardsData = [{
//     'Food and Water' : [{
//       name : 'Water',
//       id : 'water',

//     },
  
//   ]
//   },
//   'Clothing' : [{

//   }]
// ]
  
  increaseQuantity() {
    this.quantity++;
    this.deckService.setWaterQuantiy(this.quantity);
  }
  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
