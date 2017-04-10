import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRoutingComponent } from './login-routing.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRouteActivatorService } from '../shared/login-route-activator.service';


const routes: Routes = [
  {
    path: '',
    component: LoginRoutingComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [LoginRouteActivatorService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  SharedModule],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

export const routableComponents = [
  LoginComponent, LoginRoutingComponent
];