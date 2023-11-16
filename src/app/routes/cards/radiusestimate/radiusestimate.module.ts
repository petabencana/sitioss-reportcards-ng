import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadiusestimateRoutingModule } from './radiusestimate-routing.module';
import { RadiusestimateComponent } from './radiusestimate.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RadiusestimateRoutingModule,
    TranslateModule
  ],
  declarations: [RadiusestimateComponent],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class RadiusestimateModule { }
