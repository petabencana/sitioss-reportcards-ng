import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CardComponent } from '../../../components/product-cards/product-card.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TranslateModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    ProductsComponent,
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
