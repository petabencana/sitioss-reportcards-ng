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
}
