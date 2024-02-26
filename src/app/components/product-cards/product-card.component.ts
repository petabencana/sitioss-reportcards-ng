import { Component, ElementRef, ViewChild } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';
import { TranslationService } from './product.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class CardComponent {
  quantity: number = 0;
  cards: any;
  categories: any;
  selectedCategory: string | null = 'MAKANAN/AIR MINUM' || 'FOOD/WATER';

  constructor(
    private translationService: TranslationService,
    public translate: TranslateService,
    public deckService: DeckService
  ) {}

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit() {
    // Load both products and categories translations simultaneously
    forkJoin({
      //  change hard code en with language value in state
      productsData: this.translationService.getTranslations(
        this.deckService.getCardLanguage() || 'id',
        'products'
      ),
      categoriesData: this.translationService.getTranslations(
        this.deckService.getCardLanguage() || 'id',
        'categories'
      ),
    }).subscribe(({ productsData, categoriesData }) => {
      // Assign loaded translations to respective properties
      this.cards = productsData;
      this.categories = categoriesData;

      // Initialize selectedCategory and prefill cards only after both translations are loaded
      this.initSelectedCategory();
      this.prefillCards();
    });
    this.deckService.userCanBack();

    if (this.deckService.selectedProducts.length > 0) {
      this.deckService.userCanContinue();
    } else {
      this.deckService.userCannotContinue();
    }
  }

  private initSelectedCategory() {
    if (this.categories && this.categories.length > 0) {
      this.selectedCategory = this.categories[0].category;
    }
  }

  private prefillCards() {
    if (this.cards) {
      this.cards.forEach((card) => {
        const storedProduct = this.deckService.getSelectedProducts(card.title);
        if (storedProduct) {
          card.quantity = storedProduct.quantity;
          card.description = storedProduct.description;
          card.item_id = storedProduct.item_id;
        } else {
          card.quantity = 0;
          card.description = '';
        }
      });
    }
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

  get categoryLabel(): string {
    return this.translate.instant('card.needLabels.categoryLabel');
  }
  get modalHeader(): string {
    return this.translate.instant('card.needLabels.modalHeader');
  }

  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string,
    units: string,
    item_id: string
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      item_id
    );
  }

  increaseQuantity(card: any) {
    card.quantity = (card.quantity || 0) + 1;
    this.recordQuantityChange(
      card.title,
      card.quantity,
      card.category,
      card.description,
      card.img,
      card.units,
      card.item_id
    );
    this.deckService.userCanContinue();
  }

  decreaseQuantity(card: any) {
    if (card.quantity && card.quantity > 0) {
      card.quantity -= 1;
      this.recordQuantityChange(
        card.title,
        card.quantity,
        card.category,
        card.description,
        card.img,
        card.units,
        card.item_id
      );
    }
    if (this.deckService.selectedProducts.length > 0) {
      this.deckService.userCanContinue();
    } else {
      this.deckService.userCannotContinue();
    }
  }

  truncateDescription(description: string, maxLines: number): string {
    const lines = description.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + (maxLines > 1 ? '...' : '');
    }
    return description;
  }

  check() {
    // console.log(this.cards);
    // console.log(this.categories[0]);
    // console.log(this.selectCategory);
    // console.log(this.deckService.selectedProducts);
    // console.log(this.deckService.getCardLanguage());
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
      card.img,
      card.units,
      card.item_id
    );
  }

  closeModal(card: any): void {
    card.showModal = false;
    card.description = card.tempDescription;
  }
}
