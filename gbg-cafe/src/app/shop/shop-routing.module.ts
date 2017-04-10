import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ShopRoutingComponent } from './shop-routing.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRouteActivatorService } from '../shared/shop-route-activator.service';



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
  imports: [RouterModule.forChild(routes),
  SharedModule],
  exports: [RouterModule, SharedModule]
})
export class ShopRoutingModule { }

export const routableComponents = [
  ShopRoutingComponent, ShopComponent
];