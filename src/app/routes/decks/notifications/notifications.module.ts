import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { NotificationRoutingModule } from './notifications-routing.module';

// Parent component
import { NotificationComponent } from './notifications.component';
import { UtilsModule } from '../utils.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    TranslateModule,
    UtilsModule
  ],
  declarations: [
    NotificationComponent,
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class NotificationsModule { }
