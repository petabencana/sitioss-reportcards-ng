import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
