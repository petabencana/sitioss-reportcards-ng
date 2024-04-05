import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/cards/deck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor(
    private activatedroute:ActivatedRoute,
    public deckService:DeckService) { 
      this.activatedroute.queryParamMap.subscribe(params => {
        this.deckService.setTwitterID(params.get("tid"))
        this.deckService.setWaNumber(params.get("userId"))
      })
    }

  ngOnInit() {
  }

}
