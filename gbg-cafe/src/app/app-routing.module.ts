import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'shop', },
  { path: 'login', loadChildren: "app/login/login.module#LoginModule"},
  { path: 'shop', loadChildren: "app/shop/shop.module#ShopModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }