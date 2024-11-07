import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { DeckService } from '../../services/cards/deck.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-alert-popup",
  templateUrl: "./alert-popup.component.html",
  styleUrls: ["./alert-popup.component.scss"],
})

export class AlertPopupComponent implements OnInit {
  isShown: boolean = false; // hidden by default


  data: any = [];  // Initialize with an empty array
  regionCodes: string = '';
  constructor(
    public navController: NavigationService,
    public deckService: DeckService,
    public translate: TranslateService,

  ) {}
  

  ngOnInit() {
    this.loadSubscriptionData();
  }
  
  async loadSubscriptionData() {
    try {
      const subscriptions = await this.deckService.getSubscriptions();
      this.data = subscriptions;
      if(this.data.length > 0) {
        this.isShown = true;
        this.regionCodes = this.data.map(sub => sub.region_code).join('<br>');
      }
    } catch (error) {
      this.isShown = false;
    }
  }
  closePartnerPopup() {
    this.isShown = false;
  }

  showPartnerPopup() {
        this.isShown = true;
  }


  get alertPopupCTA(): string {
    return this.translate.instant('alert_popup_cta');
  }

}
