import { Component, OnInit, NgModule } from '@angular/core';
import { DeckService } from '../../services/cards/deck.service';

@Component({
  selector: 'app-depth-slider',
  templateUrl: './depth-slider.component.html',
  styleUrls: ['./depth-slider.component.scss'],
})

export class DepthSliderComponent implements OnInit {

  constructor(private deckService: DeckService) {}

  knobClass:string = '';
  dragContainerOffsetTop:number = 0;
  dragContainerHeight:number = 0;
  dragContainer; dragItem;
  sliderIsActive:boolean = false;
  currentY:number = 22;

  //val that may need to pass to parent comp / DB.
  depthText:string = this.currentY*2 + ' cm';

  async ngOnInit() {
    console.log('depth-slider ngOnInit');
    this.deckService.userCanBack();
    this.deckService.userCannotContinue();
    //get position of the card relative to top
    this.dragContainer = document.querySelector('#cardContentWrapper');
    this.dragItem = document.querySelector('#sliderZone');
    this.dragContainerOffsetTop = this.dragContainer.getBoundingClientRect().top;
    this.dragContainerHeight = this.dragContainer.getBoundingClientRect().bottom - document.querySelector('#cardContentWrapper').getBoundingClientRect().top;

    if (this.deckService.getFloodDepth()) {
      // this.depthText = this.deckService.getFloodDepth();
      // this.currentY = parseInt(this.depthText.split(' ')[0])/2;
      this.currentY = this.deckService.getFloodDepth()/2;
      this.depthText = Math.round(this.currentY * 2) + ' cm';;
      this.deckService.userCanContinue();
    }
    else {
      this.deckService.setFloodDepth(Math.round(this.currentY * 2));
    }
  }

  dragStart($event) {
    console.log($event);
    if ($event.target === this.dragItem) {
      console.log($event);
       this.sliderIsActive = true;
       this.knobClass = 'active';
     }
  }

  dragEnd($event) {
    this.sliderIsActive = false;
    this.knobClass = '';
    this.deckService.setFloodDepth(Math.round(this.currentY * 2));
    this.deckService.userCanContinue();
  }

  calcPercentInverted(val, total){
    return 100 - ((val/total)*100);
  }

  drag($event) {
    const mousePos = $event.touches? $event.touches[0].clientY : $event.clientY
    const dragPos = this.calcPercentInverted(mousePos - this.dragContainerOffsetTop, this.dragContainerHeight);
    if (this.sliderIsActive) {
      $event.preventDefault();
      //only allow currentY to update if its not bleeding beyond the boundaries of dragContainer
      if(dragPos >= 0 && dragPos <= 100){
        this.currentY = this.calcPercentInverted(mousePos - this.dragContainerOffsetTop, this.dragContainerHeight);
        this.depthText = Math.round(this.currentY * 2) + ' cm';
      }
    }
  }
}
