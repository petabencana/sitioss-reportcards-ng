import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { DeckService } from '../../services/cards/deck.service';
import { NavigationService } from '../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-submit-swipe',
  templateUrl: './submit-swipe.component.html',
  styleUrls: ['./submit-swipe.component.scss']
})
export class SubmitSwipeComponent implements OnInit {
  isLocationInIndonesia = true;
  isLoading = false;
  isSumbitted = false;
  mouseDown = false;
  initialMouse = 0;
  slideMovementTotal = 0;
  slider: JQuery<HTMLElement>;
  knob: JQuery<HTMLElement>;

  @Input() isUserAbleToContinue: boolean
  @Input() swipeText: string;

  constructor(
    public deckService: DeckService,
    public navController: NavigationService,
    public route: ActivatedRoute,
  ) { }

  get isDescriptionAndPhotoEmpty(): boolean {
    return !(this.deckService.getDescription() || this.deckService.getPreview());
  }

  canSubmit():boolean {
    return (!this.isDescriptionAndPhotoEmpty && this.deckService.isCaptchaCleared() && this.isLocationInIndonesia)
  }

  knobStart(event) {
    console.log(this.canSubmit());
    if (!this.canSubmit()) return; 
    this.mouseDown = true;
    this.slideMovementTotal = this.slider.width() - this.knob.width() - 13;
    this.initialMouse = event.clientX || (event.originalEvent as any).touches[0].pageX; 
  }

  knobEnd (event) {
    // console.log(canSubmit());
    if (!this.canSubmit()) return;
    if (!this.mouseDown) return;

    this.mouseDown = false;
    const currentMouse = event.clientX || event.changedTouches[0].pageX;
    const relativeMouse = currentMouse - this.initialMouse;

    if (relativeMouse < this.slideMovementTotal) {
      this.slider.addClass('transparent')
      this.knob.animate({ left: "0" }, 300, () => {
        this.slider.css('background-color', 'rgba(31,73,99,0)')
        this.slider.removeClass('transparent')
      });
    }
  };

  async ngOnInit() {
    // let initialMouse = 0;
    // let slideMovementTotal = 0;
    // let mouseIsDown = false;
    // const knob = $('#submitKnob');
    this.knob = $('#submitKnob');
    // const slider = $('#submitSlider')
    this.slider = $('#submitSlider')
    this.isLocationInIndonesia = await this.deckService.isLocationInIndonesia();

    // If both of description and image is empty, next button is disabled
    // if (!canSubmit()) {
    //   knob.css('background-color', '#A0A0A0')
    //   // return
    // }

    $(document.body).on('mousemove touchmove', (event) => {
      // console.log(canSubmit());
      if (!this.canSubmit()) {this.knob.css('background-color', '#A0A0A0'); return} else {this.knob.css('background-color', '#31AADE');};
      if (!this.mouseDown)
        return;

      const currentMouse = event.clientX || (event.originalEvent as any).touches[0].pageX;
      const relativeMouse = currentMouse - this.initialMouse;

      this.slider.css(
        'background-color',
        `rgba(31,73,99, ${relativeMouse / this.slideMovementTotal})`
      )

      if (relativeMouse <= 0) {
        this.knob.css({ 'left': '0' });
        return;
      }
      if (relativeMouse >= this.slideMovementTotal && ! this.isSumbitted) {
        this.knob.css({ 'left': this.slideMovementTotal + 'px' });
        this.submit()
        return;
      }
      this.knob.css({ 'left': relativeMouse });
    });
  }

  async submit() {
    this.isLoading = true
    if (!this.isSumbitted) {
      this.isSumbitted = true;
      await this.deckService.submit().then(() => {
        this.isLoading = false
        this.navController.next(this.deckService.getRoute())
      }).catch(() => {
        this.isLoading = false
        this.navController.next(this.deckService.getRoute())
      })
    }

    // setTimeout(() => {
    // }, 250)
  }
}
