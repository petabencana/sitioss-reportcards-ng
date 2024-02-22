import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { NeedComponent } from './need.component';

const routes: Routes = [
  {
    path: '',
    component: NeedComponent,
    children: env['supportedCards']['need']
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
export class NeedRoutingModule { }
