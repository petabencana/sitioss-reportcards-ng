import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { NeedRoutingModule } from './need-routing.module';

// Parent component
import { NeedComponent } from './need.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    NeedRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
   NeedComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class NeedModule { }
