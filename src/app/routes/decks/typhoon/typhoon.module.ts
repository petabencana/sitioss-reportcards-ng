import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { TyphoonRoutingModule } from './typhoon-routing.module';

// Parent component
import { TyphoonComponent } from './typhoon.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    TyphoonRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
    TyphoonComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class TyphoonModule { }