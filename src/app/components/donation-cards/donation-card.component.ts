import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';
import { TranslationService } from './donation.service';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { donationList } from './donation-list';

@Component({
  selector: 'donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss'],
})
export class DonationCardComponent implements OnInit {
  quantity: number = 0;
  giverCards: any[] = [];
  translatedData: any[]; // Store translated data
  loadingData: boolean = true;
  constructor(
    private translationService: TranslationService,
    public deckService: DeckService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Check if translated data is already available in the state
    this.translatedData = this.deckService.getTranslatedData();
    this.giverCards = this.deckService.getGiverCards() || [];

    // If translated data is not available or giverCards is empty, fetch it
    if (!this.translatedData || this.giverCards.length === 0) {
      this.translationService
        .getDonationTranslations('en')
        .subscribe((donationTranslations) => {
          if (donationTranslations) {
            this.translatedData = donationTranslations; // Store translated data
            this.deckService.setTranslatedData(donationTranslations); // Store translated data in the state
            this.loadCards(); // Load cards using translated data
          } else {
            console.error('Donation translations not found');
          }
        });
    } else {
      // If translated data and giverCards are available, load cards directly
      this.loadCards();
    }

    this.deckService.userCanBack();
    this.deckService.userCanContinue();
  }

  private loadCards() {
    this.loadingData = true; // Set loading state to true    // Fetch cards
    this.http
      .get<any[]>(
        `${env.data_server}needs/need?requestId=${this.deckService.requestId}`
      )
      .subscribe((apiDonationData) => {
        if (apiDonationData) {
          this.giverCards = apiDonationData.map((donation) => {
            const product = this.translatedData.find(
              (p) => p.item_id === donation.item_id
            );
            const title = product ? product.title : donation.title;
            return {
              title: title,
              description: donation.description || '',
              category: product.category,
              img: product.img,
              quantity: +donation.quantity_requested,
              status:
                donation.quantity_satisfied !== null
                  ? `${(
                      (donation.quantity_satisfied /
                        donation.quantity_requested) *
                      100
                    ).toFixed(0)}% Met`
                  : '0% Met',
              donate:
                donation.quantity_satisfied !== null
                  ? +donation.quantity_satisfied
                  : 0,
              units: product ? product.units : '', // Add units from product if available
              item_id: donation.item_id,
              need_id: donation.id,
            };
          });
          this.deckService.setTranslatedData(this.giverCards);

          // Fetch selected products from the DeckService for each card
          this.giverCards.forEach((card) => {
            const selectedProduct = this.deckService.getSelectedProducts(
              card.title
            );
            if (selectedProduct) {
              card.donate = selectedProduct.donate;
            }
          });
        } else {
          console.error('API donation data not found');
        }
        this.loadingData = false; // Set loading state to false
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
    need_id: number,
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
        card.item_id,
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
          card.item_id,
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
          card.item_id,
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
    // console.log(this.deckService.selectedProducts);
    console.log(this.giverCards);
    // console.log(this.translatedData);
  }

  openDescriptionModal(card: any): void {
    card.showModal = true;
  }

  closeModal(card: any): void {
    card.showModal = false;
  }
}
