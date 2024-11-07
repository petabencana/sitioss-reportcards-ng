import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationreviewComponent } from './donationreview.component';

const routes: Routes = [
  { path: '', component: DonationreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationreviewRoutingModule { }
