import { Component, ElementRef, ViewChild } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';
import { productsList } from './products-list';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class CardComponent {
  quantity: number = 0;

  cards = productsList;


  categories = [
    {
      category: 'FOOD/WATER',
      description: '',
      img: '../../../assets/decks/logistics/products/Food.png',
    },
    {
      category: 'CLOTHES & SELF PROTECTION KIT',
      description: '',
      img: '../../../assets/decks/logistics/products/no-pictures.png',
    },
    {
      category: 'BABIES AND CHILDREN',
      description: '',
      img: '../../../assets/decks/logistics/products/no-pictures.png',
    },
    {
      category: 'HOUSEHOLD AND EMERGENCY SUPPLIES',
      description: '',
      img: '../../../assets/decks/logistics/products/no-pictures.png',
    },
    {
      category: 'PERSONAL HEALTH',
      description: '',
      img: '../../../assets/decks/logistics/products/no-pictures.png',
    },
    {
      category: 'HYGIENE KITS',
      description: '',
      img: '../../../assets/decks/logistics/products/no-pictures.png',
    },
  ];

  constructor(public deckService: DeckService) {}

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedCategory: string | null = 'FOOD/WATER';

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
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

  increaseQuantity(card: any) {
    card.quantity = (card.quantity || 0) + 1;
    this.recordQuantityChange(
      card.title,
      card.quantity,
      card.category,
      card.description,
      card.img
    );
  }

  decreaseQuantity(card: any) {
    if (card.quantity && card.quantity > 0) {
      card.quantity -= 1;
      this.recordQuantityChange(
        card.title,
        card.quantity,
        card.category,
        card.description,
        card.img
      );
    }
  }

  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img
    );
  }

  truncateDescription(description: string, maxLines: number): string {
    const lines = description.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + (maxLines > 1 ? '...' : '');
    }
    return description;
  }

  check() {
    console.log(this.deckService.selectedProducts);
  }

  openDescriptionModal(card: any): void {
    card.showModal = true;
    card.tempDescription = card.description;
  }

  saveDescription(card: any): void {
    card.showModal = false;

    this.recordQuantityChange(
      card.title,
      card.quantity,
      card.category,
      card.description,
      card.img
    );
  }

  closeModal(card: any): void {
    card.showModal = false;
    card.description = card.tempDescription;
  }
}
