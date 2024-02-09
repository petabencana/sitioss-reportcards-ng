import { Component, ElementRef, ViewChild } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';
import { donationList } from './donation-list';

@Component({
  selector: 'donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss'],
})
export class DonationCardComponent {
  quantity: number = 0;

  cards = donationList;

  constructor(public deckService: DeckService) {}

  selectedCategory: string | null = 'FOOD/WATER';

  increaseQuantity(card: any) {
    if ((card.quantity > card.donate)) {
      card.donate = (card.donate || 0) + 1;
    }
  }

  decreaseQuantity(card: any) {
    if (card.donate && card.donate > 0) {
      card.donate -= 1;
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
