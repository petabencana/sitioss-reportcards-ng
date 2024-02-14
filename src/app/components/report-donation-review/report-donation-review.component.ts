import { Component } from '@angular/core';

import { DeckService } from '../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donation-review',
  templateUrl: './report-donation-review.component.html',
  styleUrls: ['./report-donation-review.component.scss'],
})
export class ReportDonationReviewComponent {
  previewImg: HTMLImageElement;
  previewImgContainer: HTMLDivElement;

  constructor(
    public deckService: DeckService,
    public translate: TranslateService
  ) {}

  get donationdetails() {
    return this.deckService.selectedProducts;
  }

  get donationDate(){
    return this.deckService.donationDate
  }
  get donationTime(){
    return this.deckService.donationTime
  }

  truncateDescription(description: string, maxLines: number): string {
    const lines = description.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + (maxLines > 1 ? '...' : '');
    }
    return description;
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
