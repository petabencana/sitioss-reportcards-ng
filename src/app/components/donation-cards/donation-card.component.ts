import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';
import { TranslationService } from './donation.service';
import { donationList } from './donation-list';

@Component({
  selector: 'donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss'],
})
export class DonationCardComponent implements OnInit {
  quantity: number = 0;
  cards: any[];
  translatedData: any[]; // Store translated data

  constructor(
    private translationService: TranslationService,
    public deckService: DeckService
  ) {}

  ngOnInit() {
    // Check if translated data is already available in the state
    this.translatedData = this.deckService.getTranslatedData();

    // If translated data is not available, fetch it from the translation service
    if (!this.translatedData) {
      this.translationService.getDonationTranslations('en').subscribe(donationTranslations => {
        if (donationTranslations) {
          this.translatedData = donationTranslations; // Store translated data
          this.deckService.setTranslatedData(donationTranslations); // Store translated data in the state
          this.loadCards(); // Load cards using translated data
        } else {
          console.error('Donation translations not found');
        }
      });
    } else {
      // If translated data is already available, load cards directly
      this.loadCards();
    }

    this.deckService.userCanBack();
    this.deckService.userCanContinue();
  }

  private loadCards() {
    // Use translated data to map donation list
    this.cards = donationList.map(donation => {
      const product = this.translatedData.find(p => p.item_id === donation.item_id);
      return product ? { ...donation, title: product.title } : donation;
    });

    // Fetch selected products from the DeckService for each card
    this.cards.forEach(card => {
      const selectedProduct = this.deckService.getSelectedProducts(card.title);
      if (selectedProduct) {
        card.donate = selectedProduct.donate;
      }
    });
  }
  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string,
    units: string,
    item_id: string,
    donate: number
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      item_id,
      donate
    );
  }

  increaseQuantity(card: any) {
    if (card.quantity > card.donate) {
      card.donate = (card.donate || 0) + 1;
      this.recordQuantityChange(
        card.title,
        card.quantity,
        card.category,
        card.description,
        card.img,
        card.units,
        card.item_id,
        card.donate
      );
    }
  }

  decreaseQuantity(card: any) {
    if (card.donate && card.donate > 0) {
      card.donate -= 1;
      if (card.donate === 0) {
        // If donate becomes 0, remove the product from selectedProducts
        this.deckService.setSelectedProducts(
          card.title,
          0,
          card.category,
          card.description,
          card.img,
          card.units,
          card.item_id,
          card.donate
        );
      } else {
        // If donate is greater than 0, update selectedProducts
        this.recordQuantityChange(
          card.title,
          card.quantity,
          card.category,
          card.description,
          card.img,
          card.units,
          card.item_id,
          card.donate
        );
      }
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
    console.log(this.deckService.selectedProducts);
    console.log(this.cards);
    
  }

  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  closeModal(card: any): void {
    card.showModal = false;
  }
}
