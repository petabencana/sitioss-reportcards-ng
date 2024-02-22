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

  get donationDate() {
    return this.deckService.donationDate;
  }
  get donationTime() {
    return this.deckService.donationTime;
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
    item_id: string,
    need_id: number,
    donate: number,
    limit: number
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      item_id,
      need_id,
      donate,
      limit
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
        card.need_id,
        card.donate,
        card.limit
      );
    }
  }

  decreaseQuantity(card: any) {
    if (card.donate && card.donate > 0) {
      card.donate -= 1;
      if (card.donate === 0 || card.donate === card.limit) {
        // If donate becomes 0, remove the product from selectedProducts
        this.deckService.setSelectedProducts(
          card.title,
          0,
          card.category,
          card.description,
          card.img,
          card.units,
          card.item_id,
          card.need_id,
          card.donate,
          card.limit
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
          card.need_id,
          card.donate,
          card.limit
        );
      }
    }
  }

  check() {
    console.log(this.deckService.selectedProducts);

    // console.log(
    //   this.deckService.donationDate,
    //   this.deckService.donationTime,
    //   this.deckService.countryName,
    //   this.deckService.countryCode,
    //   this.deckService.contactNumber
    // );
  }
  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  closeModal(card: any): void {
    card.showModal = false;
  }

  handleSuccess(event) {
    // add verification step
    this.deckService.setCaptchaCleared();
  }
}
