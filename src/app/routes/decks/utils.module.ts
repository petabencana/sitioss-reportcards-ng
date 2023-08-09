import { NgModule } from '@angular/core';
import { DropdownNotificationComponent } from '../../components/dropdown-notification/dropdown-notification.component';
import { NavButtonComponent } from '../../components/nav-button/nav-button.component';
import { TitleBoxComponent } from '../../components/title-box/title-box.component';
import { TypeButtonComponent } from '../../components/type-button/type-button.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
  declarations: [
    DropdownNotificationComponent,
    NavButtonComponent,
    TitleBoxComponent,
    TypeButtonComponent
  ],
  exports: [
    DropdownNotificationComponent,
    NavButtonComponent,
    TitleBoxComponent,
    TypeButtonComponent
  ]
})
export class UtilsModule {}
