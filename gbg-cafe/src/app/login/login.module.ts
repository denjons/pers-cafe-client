import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule, routableComponents } from './login-routing.module';



@NgModule({
  declarations: [
    routableComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports:[ routableComponents],
  providers: [/*RequestService*/]
})
export class LoginModule { }