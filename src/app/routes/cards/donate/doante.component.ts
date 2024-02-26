import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  constructor(
    public deckService: DeckService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.deckService.userCanBack()
    this.deckService.userCanContinue()
  }
}
