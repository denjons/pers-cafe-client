import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRoutingComponent } from './login-routing.component';

import {  } from 'module';


const routes: Routes = [
  {
    path: '',
    component: LoginRoutingComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

export const routableComponents = [
  LoginComponent, LoginRoutingComponent
];