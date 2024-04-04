import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouRoutingModule } from './thankyou-routing.module';
import { ThankYouComponent } from './thankyou.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ThankYouRoutingModule,
    TranslateModule
  ],
  declarations: [ThankYouComponent],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class ThankyouModule {}
