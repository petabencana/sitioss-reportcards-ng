import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

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

  constructor(public route: ActivatedRoute, public deckService: DeckService, public navController: NavigationService) { }

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

  ngOnInit() {}

  onClick() {
    if (this.isDisabled) return

    this.navigate.emit()
  }
}
