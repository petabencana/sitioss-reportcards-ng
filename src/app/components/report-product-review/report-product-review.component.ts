import { Component } from '@angular/core';

import { DeckService } from '../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-review',
  templateUrl: './report-product-review.component.html',
  styleUrls: ['./report-product-review.component.scss'],
})
export class ReportProductReviewComponent {
  previewImg: HTMLImageElement;
  previewImgContainer: HTMLDivElement;

  constructor(
    public deckService: DeckService,
    public translate: TranslateService
  ) {}

  // logistics
  get logisticsdetails() {
    return this.deckService.selectedProducts;
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
  ) {
    this.deckService.setSelectedProducts(
      title,
      quantity,
      category,
      description,
      img,
      units,
      need_id
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
      card.need_id,
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
        card.img,
        card.units,
        card.need_id,
      );
    }
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
      card.img,
      card.units,
      card.need_id
    );
  }

  closeModal(card: any): void {
    card.showModal = false;
    card.description = card.tempDescription;
  }
}
