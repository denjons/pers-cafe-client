import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ShopRoutingComponent } from './shop-routing.component';
import { ShopRouteActivatorService } from './shop-route-activator.service';



const routes: Routes = [
  {
    path: '',
    component: ShopRoutingComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
        canActivate: [ShopRouteActivatorService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

export const routableComponents = [
  ShopRoutingComponent, ShopComponent
];