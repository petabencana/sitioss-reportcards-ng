import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { NeedsRoutingModule } from './needs-routing.module';

// Parent component
import { NeedsComponent } from './needs.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    NeedsRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
   NeedsComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class NeedsModule { }
