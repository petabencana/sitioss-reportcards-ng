import { NgModule } from '@angular/core';
import { DropdownNotificationComponent } from '../../components/dropdown-notification/dropdown-notification.component';
import { NavButtonComponent } from '../../components/nav-button/nav-button.component';
import { TitleBoxComponent } from '../../components/title-box/title-box.component';
import { ReportTypeButtonComponent } from '../../components/report-type-button/report-type-button.component';
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
    ReportTypeButtonComponent
  ],
  exports: [
    DropdownNotificationComponent,
    NavButtonComponent,
    TitleBoxComponent,
    ReportTypeButtonComponent
  ]
})
export class UtilsModule {}
