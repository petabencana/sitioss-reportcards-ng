import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { LogisticsComponent } from './logistics.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticsComponent,
    children: env['supportedCards']['logistics']
  },
  // Optional, redirectTo first card in prep
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule { }
