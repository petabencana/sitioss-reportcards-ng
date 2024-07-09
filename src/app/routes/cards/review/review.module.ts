import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';
import { SharedModule } from '../../../components/shared/shared.module';
import { ReportReviewComponent } from '../../../components/report-review/report-review.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  imports: [
    CommonModule,
    ReviewRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  declarations: [ReviewComponent, ReportReviewComponent],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class ReviewModule { }
