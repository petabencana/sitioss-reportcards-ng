import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { TyphoonComponent } from './typhoon.component';

const routes: Routes = [
  {
    path: '',
    component: TyphoonComponent,
    children: env['supportedCards']['typhoon']
  },
  // Optional, redirectTo first card in prep
  {
    path: '**',
    redirectTo: 'location',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TyphoonRoutingModule { }