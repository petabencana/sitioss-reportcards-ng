import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductreviewComponent } from './productreview.component';

const routes: Routes = [
  { path: '', component: ProductreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductreviewRoutingModule { }
