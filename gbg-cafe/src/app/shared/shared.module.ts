import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopRouteActivatorService } from './shop-route-activator.service';
import { LoginRouteActivatorService } from './login-route-activator.service';
import { FilterTextModule } from './filter/filter-text.module'


// imports: imports the module's exports. which are usually
// declarables(components / directives / pipes) and providers.
// in our case the FilterTextModule has a provider.
//
// exports: exports modules AND declarables (components/directives/pipes) that other modules may want to use
// SharedModule does not use CommonModule, but does use FormsModule.
// Even so, we import/export both of these because most other modules will import SharedModule and will need them.
@NgModule({
  imports: [CommonModule, FilterTextModule, FormsModule],
  exports: [CommonModule, FilterTextModule, FormsModule],
  declarations: [],
  providers: [ShopRouteActivatorService, LoginRouteActivatorService]
})
export class SharedModule { }

