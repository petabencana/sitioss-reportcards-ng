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
    { title: 'Meals', description: 'Veg/Non veg' , category: 'Food'},
    { title: 'Shirt', description: '1 pair',category: 'Clothes' },
    { title: 'Dolo', description: '5 Strips',category: 'Med' },
   
  ];

 categories = [
    { category: 'Med', description: '' },
    { category: 'Food', description: '' },
    { category: 'Clothes', description: '' },
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
  
//   increaseQuantity() {
//     this.quantity++;
//     this.deckService.setWaterQuantiy(this.quantity);
//   }
//   decreaseQuantity() {
//     if (this.quantity > 0) {
//       this.quantity--;
//     }
//   }
// }


selectedCategory: string | null = 'Med';


get filteredCards() {
  return this.selectedCategory
    ? this.cards.filter((card) => card.category === this.selectedCategory)
    : this.cards;
}

selectCategory(category: string) {
  this.selectedCategory = category;
}

increaseQuantity(card: any) {
  card.quantity = (card.quantity || 0) + 1;
}

decreaseQuantity(card: any) {
  if (card.quantity && card.quantity > 0) {
    card.quantity -= 1;
  }
}
}