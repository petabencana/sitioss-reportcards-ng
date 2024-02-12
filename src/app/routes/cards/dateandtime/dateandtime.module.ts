import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { DateandtimeRoutingModule } from './dateandtime-routing.module';
import { DateandtimeComponent } from './dateandtime.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DateandtimeRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  declarations: [
    DateandtimeComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class DateandtimeModule { }
