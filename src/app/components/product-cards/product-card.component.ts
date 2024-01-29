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
      title: 'Water',
      description: '',
      category: 'Food',
      img: '../../../assets/decks/logistics/products/Water.png',
      quantity: 0,
    },
    {
      title: 'Ready to Eat Meals',
      description: '',
      category: 'Food',
      img: '../../../assets/decks/logistics/products/ReadytoEatMeals.png',
      quantity: 0,
      descriptionPlaceholder:
        'Add description. E.g. instant porridge, bread, biscuits, nasi bungkus/padang',
      hasDescription: true,
    },
    {
      title: 'Rice Sack',
      description: '',
      category: 'Food',
      img: '../../../assets/decks/logistics/products/RiceSack.png',
      quantity: 0,
    },
    {
      title: 'Mask',
      description: '',
      category: 'Medicine',
      img: '../../../assets/decks/logistics/products/Mask.png',
      quantity: 0,
    },
    {
      title: 'Paracetamol',
      description: '',
      category: 'Medicine',
      img: '../../../assets/decks/logistics/products/Paracetamol.png',
      quantity: 0,
    },
    {
      title: 'Anti Fungal Cream',
      description: '',
      category: 'Medicine',
      img: '../../../assets/decks/logistics/products/AntiFungalCream.png',
      quantity: 0,
    },
    {
      title: 'Baby Bottle',
      description: '',
      category: 'Medicine',
      img: '../../../assets/decks/logistics/products/Babybottle.png',
      quantity: 0,
    },
    {
      title: 'Flashlight',
      description: '',
      category: 'Electronics',
      img: '../../../assets/decks/logistics/products/Flashlight.png',
      quantity: 0,
    },
  ];

  categories = [
    {
      category: 'Food',
      description: '',
      img: '../../../assets/decks/logistics/products/Food.png',
    },
    {
      category: 'Medicine',
      description: '',
      img: '../../../assets/decks/logistics/products/Firstaid.png',
    },
    {
      category: 'Electronics',
      description: '',
      img: '../../../assets/decks/logistics/products/Flashlight.png',
    },
  ];

  constructor(public deckService: DeckService) {}

  selectedCategory: string | null = 'Food';

  ngOnInit() {
    this.cards.forEach((card) => {
      const storedProduct = this.deckService.getSelectedProducts(card.title);
      if (storedProduct) {
        card.quantity = storedProduct.quantity;
        card.description = storedProduct.description;
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
    this.recordQuantityChange(
      card.title,
      card.quantity,
      card.category,
      card.description
    );
  }

  decreaseQuantity(card: any) {
    if (card.quantity && card.quantity > 0) {
      card.quantity -= 1;
      this.recordQuantityChange(
        card.title,
        card.quantity,
        card.category,
        card.description
      );
    }
  }

  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description
    );
  }

  check() {
    console.log(this.deckService.selectedProducts);
  }

  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  saveDescription(card: any): void {
    card.showModal = false;
    console.log(card);

    this.recordQuantityChange(
      card.title,
      card.quantity,
      card.category,
      card.description
    );
  }

  closeModal(card: any): void {
    card.showModal = false;
  }
}
