import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateandtimeComponent } from './dateandtime.component';

const routes: Routes = [
  { path: '', component: DateandtimeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateandtimeRoutingModule { }
