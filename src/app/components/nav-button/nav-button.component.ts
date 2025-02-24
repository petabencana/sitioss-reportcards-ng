import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { DeckService } from '../../services/cards/deck.service';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent implements OnInit {
  @Input() text: string;
  @Input() type: 'right' | 'left' | 'default';
  @Output() navigate = new EventEmitter<any>();

   showModal: boolean = false;
   userAddress = {
    address: '',
    city: '',
    province: '',
    postal: '',
    notes: ''
  };
   InputAddress: any = [];
    constructor(public route: ActivatedRoute, public deckService: DeckService, public navController: NavigationService, public translate: TranslateService) { }

  get isDisabled(): boolean {
    return (
      this.type === 'right' && this.deckService.isNextButtonDisabled ||
      this.type === 'left' && this.deckService.isPrevButtonDisabled
    )
  }

  get isBtnHidden(): boolean {
    const currentRouteName = this.navController.getCurrentRouteName()
    return  currentRouteName === 'productreview' || currentRouteName === 'donationreview'
  }

  get isDescription(): boolean {
    const routeName = this.navController.getCurrentRouteName()
    const isdecription = (this.deckService.selectedProducts.every((item) => {
      return (item.hasDescription !== true) || (item.description !== "")
      })  
    );
    const btn = routeName === 'products' &&  !isdecription
    return btn;
  }

  getTranslation(key: string): string {
    return this.translate.instant(`card.modal.${key}`);
  }

  saveDescription() {
    this.showModal = false;
    console.log('addr:',this.userAddress);
    this.deckService.setAddress(this.userAddress)
    this.navigate.emit()
  }

  ngOnInit() {}

  get isUserAddressValid(): boolean {
    let valid = Object.values(this.userAddress).every(value => value && value.trim() !== '');
    return valid;
  }

  onClick() {
    const routeName = this.navController.getCurrentRouteName()
    const deck = this.deckService.getDeckSubType()
    if (this.isDisabled) return
    if(this.type === 'right' && routeName === 'location' && deck === 'need') {
      this.showModal = true;
      this.InputAddress = this.deckService.getInputAddress();
      this.userAddress.postal = this.InputAddress[0][0].context[0].id.split('.')[1];
      this.userAddress.province = this.InputAddress[0][3].place_name.split(',')[0];
    } else {
      this.navigate.emit()
    }
  }
}
