import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecieptItemComponent } from './reciept.component';





@NgModule({
  declarations: [
    RecieptItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ RecieptItemComponent],
  providers: []
})
export class RecieptModule { }