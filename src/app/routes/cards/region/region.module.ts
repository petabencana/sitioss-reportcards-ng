import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import {AlertPopupComponent} from '../../../components/alert-popup/alert-popup.component'
@NgModule({
  imports: [
    CommonModule,
    RegionRoutingModule,
    TranslateModule
  ],
  declarations: [RegionComponent , AlertPopupComponent],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class RegionModule { }
