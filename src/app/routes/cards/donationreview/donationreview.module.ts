import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { DonationreviewRoutingModule } from './donationreview-routing.module';
import { DonationreviewComponent } from './donationreview.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ReportDonationReviewComponent } from '../../../components/report-donation-review/report-donation-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UtilsModule } from '../../decks/utils.module';

@NgModule({
  imports: [
    CommonModule,
    DonationreviewRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    UtilsModule,
  ],
  declarations: [
    DonationreviewComponent,
    ReportDonationReviewComponent,
  ],
  exports: [TranslateModule],
  providers: [TranslatePipe],
})
export class DonationreviewModule {}
