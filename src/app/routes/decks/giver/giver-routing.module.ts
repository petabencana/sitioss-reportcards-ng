import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { GiverComponent } from './giver.component';

const routes: Routes = [
  {
    path: '',
    component: GiverComponent,
    children: env['supportedCards']['giver']
  },
  // Optional, redirectTo first card in prep
  {
    path: '**',
    redirectTo: 'donate',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeedsRoutingModule { }
