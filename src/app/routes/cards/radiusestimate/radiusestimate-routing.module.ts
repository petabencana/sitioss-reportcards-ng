import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadiusestimateComponent } from './radiusestimate.component';

const routes: Routes = [
  { path: '', component: RadiusestimateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiusestimateRoutingModule { }
