import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { LogisticsRoutingModule } from './logistics-routing.module';

// Parent component
import { LogisticsComponent } from './logistics.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
    LogisticsComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class LogisticsModule { }
