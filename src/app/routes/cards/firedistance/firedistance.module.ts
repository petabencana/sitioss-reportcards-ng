import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiredistanceRoutingModule } from './firedistance-routing.module';
import { FiredistanceComponent } from './firedistance.component';
import { FormsModule } from '@angular/forms';
import { LocationModule } from '../location.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FiredistanceRoutingModule,
    LocationModule,
    TranslateModule
  ],
  declarations: [
    FiredistanceComponent, 
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class FiredistanceModule { }
