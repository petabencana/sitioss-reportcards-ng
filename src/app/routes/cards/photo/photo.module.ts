import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card route components
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './photo.component';

// Card route components
import { IconButtonComponent } from '../../../components/icon-button/icon-button.component';
import { ImageUploaderComponent } from '../../../components/image-uploader/image-uploader.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PhotoRoutingModule,
    TranslateModule
  ],
  declarations: [
    PhotoComponent,
    IconButtonComponent,
    ImageUploaderComponent
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslatePipe
  ]
})
export class PhotoModule { }
