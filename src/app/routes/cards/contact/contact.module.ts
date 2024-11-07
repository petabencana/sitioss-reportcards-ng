import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

// Child components

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ContactRoutingModule, TranslateModule, FormsModule],
  declarations: [ContactComponent],
  exports: [TranslateModule],
  providers: [TranslatePipe],
})
export class ContactModule {}
