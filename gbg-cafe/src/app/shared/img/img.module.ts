import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { ImgService } from './img.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [],
  declarations: [],
  providers: [ImgService]
})
export class ImgModule { }

