import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { ProductreviewRoutingModule } from './productreview-routing.module';
import { ProductreviewComponent } from './productreview.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ReportProductReviewComponent } from '../../../components/report-product-review/report-product-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';

@NgModule({
  imports: [
    CommonModule,
    ProductreviewRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  declarations: [
    ProductreviewComponent,
    ReportProductReviewComponent,
    SubmitButtonComponent,
  ],
  exports: [TranslateModule],
  providers: [TranslatePipe],
})
export class ProductreviewModule {}
