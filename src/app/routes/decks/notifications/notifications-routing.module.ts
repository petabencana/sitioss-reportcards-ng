import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment as env } from '../../../../environments/environment';
import { NotificationComponent } from './notifications.component';
const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    children: env['supportedCards']['notifications']
  },
  // Optional, redirectTo first card in prep
  {
    path: '**',
    redirectTo: 'region',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
