import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
    LoginRoutingModule,
    HttpModule
  ],
  exports:[ routableComponents],
  providers: [/*RequestService*/]
})
export class LoginModule { }