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

  constructor(
    private translationService: TranslationService,
    public deckService: DeckService
  ) {}

  ngOnInit() {
    // Load translations for donation cards
    this.translationService.getDonationTranslations('id').subscribe(donationTranslations => {
      if (donationTranslations) {
        this.cards = donationList.map(donation => {
          const product = donationTranslations.find(p => p.need_id === donation.need_id);
          return product ? { ...donation, title: product.title } : donation;
        });
      } else {
        console.error('Donation translations not found');
      }
    });
    
    this.deckService.userCanBack();
    this.deckService.userCanContinue();
  }



  private recordQuantityChange(
    title: string,
    quantity: number,
    category: string,
    description: string,
    img: string,
    units: string,
    need_id: string,
    donate: number
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      need_id,
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
        card.need_id,
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
          card.need_id,
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
          card.need_id,
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
  }

  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  closeModal(card: any): void {
    card.showModal = false;
  }
}
