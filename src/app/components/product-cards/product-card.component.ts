// card.component.ts
import { Component } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class CardComponent {
  quantity: number = 0;

  cards = [
    {
      title: 'Meals',
      description: 'Veg/Non veg',
      category: 'Food',
      img: '../../../assets/decks/logistics/products/Water.png',
      quantity: 0
    },
    {
      title: 'Shirt',
      description: '1 pair',
      category: 'Clothes',
      img: '../../../assets/decks/logistics/products/Blanket.png',
      quantity: 0

    },
    {
      title: 'Dolo',
      description: '5 Strips',
      category: 'Med',
      img: '../../../assets/decks/logistics/products/Tablet.png',
      quantity: 0

    },
  ];

  categories = [
    {
      category: 'Med',
      description: '',
      img: '../../../assets/decks/logistics/products/Firstaid.png',
    },
    {
      category: 'Food',
      description: '',
      img: '../../../assets/decks/logistics/products/Food.png',
    },
    {
      category: 'Clothes',
      description: '',
      img: '../../../assets/decks/logistics/products/Clothes.png',
    },
  ];

  constructor(public deckService: DeckService) {}

  selectedCategory: string | null = 'Med';

  // cart: { title: string; quantity: number,category: string  }[] = [];


  ngOnInit() {
    this.cards.forEach((card) => {
      const storedProduct = this.deckService.getSelectedProducts(card.title);
      if (storedProduct) {
        card.quantity = storedProduct.quantity;
      }
    });
  }


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
    this.recordQuantityChange(card.title, card.quantity, card.category);
  }

  decreaseQuantity(card: any) {
    if (card.quantity && card.quantity > 0) {
      card.quantity -= 1;
      this.recordQuantityChange(card.title, card.quantity, card.category);
    }
  }

  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string
  ) {
    // if (quantity === 0) {
    //   this.cart = this.cart.filter((change) => change.title !== title);
    // } else {
    //   const index = this.cart.findIndex((change) => change.title === title);

    //   if (index !== -1) {
    //     this.cart[index].quantity = quantity;
    //     this.cart[index].category = category;

    //   } else {
    //     this.cart.push({ title, quantity , category});
    //   }
    // }
    this.deckService.setSelectedProducts(title, quantity, category);
  }

  check() {
    // console.log(this.cart);
    console.log(this.deckService.selectedProducts);
  }
}
