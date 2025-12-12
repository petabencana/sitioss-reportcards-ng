import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UtilsModule } from '../../decks/utils.module';


@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    UtilsModule
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class SummaryModule { }
