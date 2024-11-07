import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { NeedsRoutingModule } from './giver-routing.module';

// Parent component
import { GiverComponent } from './giver.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    NeedsRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
   GiverComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class GiverModule { }
