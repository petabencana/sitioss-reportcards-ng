import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { DonateRoutingModule } from './donate-routing.module';
import { DonateComponent } from './doante.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
// import { CardComponent } from '../../../components/product-cards/product-card.component'



@NgModule({
  imports: [
    CommonModule,
    DonateRoutingModule,
    TranslateModule,
  ],
  declarations: [
    DonateComponent,
    // CardComponent
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class DonateModule { }
