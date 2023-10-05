import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

// Routing module
import { DeckRoutingModule } from './deck-routing.module';

// Parent component
import { DeckComponent } from './deck.component';

// Child components
import { DropdownNotificationComponent } from '../../src/app/components/dropdown-notification/dropdown-notification.component';
import { NavButtonComponent } from '../../src/app/components/nav-button/nav-button.component';
import { TitleBoxComponent } from '../../src/app/components/title-box/title-box.component';
import { TypeButtonComponent } from '../../src/app/components/type-button/type-button.component';

@NgModule({
  imports: [
    CommonModule,
    DeckRoutingModule,
    TranslateModule
  ],
  declarations: [
    DeckComponent,
    NavButtonComponent,
    DropdownNotificationComponent,
    TitleBoxComponent,
    TypeButtonComponent
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class DeckModule { }
