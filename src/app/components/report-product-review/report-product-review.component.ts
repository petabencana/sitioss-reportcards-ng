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
  check() {
    console.log(this.deckService.selectedProducts);
}


}
