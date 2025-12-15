import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { FloodRoutingModule } from './flood-routing.module';

// Parent component
import { FloodComponent } from './flood.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    FloodRoutingModule,
    TranslateModule,
    UtilsModule,
  ],
  declarations: [
    FloodComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class FloodModule { }
