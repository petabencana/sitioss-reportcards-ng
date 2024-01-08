import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

// Child components
import { TextDisplayComponent } from '../../../components/sample-text/text-display.component'

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../../components/product-cards/product-card.component'



@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TranslateModule
  ],
  declarations: [
    ProductsComponent,
    TextDisplayComponent,
    CardComponent
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class ProductsModule { }
