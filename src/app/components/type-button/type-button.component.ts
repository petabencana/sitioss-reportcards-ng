import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-button',
  templateUrl: './type-button.component.html',
  styleUrls: ['./type-button.component.scss'],
})
export class TypeButtonComponent {
  @Input() title: string;
  @Input() hint: string;
  @Input() imgUrl: string;
  @Input() highlightImgUrl: string;
  @Input() isCentered: boolean = false;

  onMouseEnter(img: HTMLImageElement) {
    img.setAttribute('src', this.highlightImgUrl);
  }

  onMouseLeave(img: HTMLImageElement) {
    img.setAttribute('src', this.imgUrl);
  }
}
