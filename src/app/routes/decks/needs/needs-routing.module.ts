import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { NeedsComponent } from './needs.component';

const routes: Routes = [
  {
    path: '',
    component: NeedsComponent,
    children: env['supportedCards']['needs']
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
export class NeedsRoutingModule { }
