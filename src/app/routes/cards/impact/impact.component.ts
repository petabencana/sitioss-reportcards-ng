import { Component, AfterViewChecked, ChangeDetectorRef, OnInit } from '@angular/core';
import { countArrowOffset } from '../../../utils/slider'
import { DeckService } from '../../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class ImpactComponent implements OnInit, AfterViewChecked {
  titles: string[]
  subtitles: string[]
  images: string[]
  
  title: string
  subtitle: string
  image: string
  impact: number

  constructor(
    public deckService: DeckService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService
  ) {
    this.initTitles()
    this.initSubtitles()
    this.initImages()
  }

  ngOnInit() {
    this.deckService.userCanBack()

    this.isUserAbleToContinue()
  }

  isUserAbleToContinue() {
    if (this.deckService.getImpact() === undefined) {
      this.deckService.userCannotContinue()
    } else {
      this.deckService.userCanContinue()
    }
  }

  initTitles() {
    if(this.deckService.getDeckSubType() === 'smog') {
      this.titles = [
        "card.impact.smog.symptoms.0.title",
        "card.impact.smog.symptoms.1.title",
        "card.impact.smog.symptoms.2.title"
      ]
    } else {
      this.titles = [
        "card.impact.symptoms.0.title",
        "card.impact.symptoms.1.title",
        "card.impact.symptoms.2.title"
      ]
    }
  }

  initSubtitles() {
    if(this.deckService.getDeckSubType() === 'smog'){
      this.subtitles = [
        "card.impact.smog.symptoms.0.subtitle",
        "card.impact.smog.symptoms.1.subtitle",
        "card.impact.smog.symptoms.2.subtitle"
      ]
    } else {
      this.subtitles = [
        "card.impact.symptoms.0.subtitle",
        "card.impact.symptoms.1.subtitle",
        "card.impact.symptoms.2.subtitle"
      ]
    }
  }

  initImages() {
    this.images = [
      "../../../../assets/decks/wind/impact/Graphic_Cracking.png",
      "../../../../assets/decks/wind/impact/Graphic_PartialCollapse.png",
      "../../../../assets/decks/wind/impact/Graphic_TotalCollapse.png",
    ];
  }

  ngAfterViewChecked() {
    this.setImpact(this.deckService.getImpact() || 0, 'service')
    this.cdRef.detectChanges()
  }

  onInputChange(value): void {
    this.deckService.userCanContinue()

    this.setImpact(value, 'input')
  }

  setImpact(value, from: 'input' | 'service'): void {
    const intValue = parseInt(value)
    const leftArrow = document.querySelector('.left-arrow') as HTMLDivElement
    const rightArrow = document.querySelector('.right-arrow') as HTMLDivElement
    const slider = document.querySelector('.impact__slider-range') as HTMLInputElement

    this.impact = intValue
    this.title = this.titles[intValue]
    this.image = this.images[intValue]
    this.subtitle = this.subtitles[intValue]

    // Fallback, if user not use the input to change the value,
    // don't change the value in service yet
    if (from === 'service' && this.deckService.getImpact() === undefined) {
      this.deckService.setImpact(undefined)
    } else {
      this.deckService.setImpact(intValue)
    }

    leftArrow.style.left = countArrowOffset(intValue, 2, slider.offsetWidth, 'left')
    rightArrow.style.left = countArrowOffset(intValue, 2, slider.offsetWidth, 'right')
  }
}
