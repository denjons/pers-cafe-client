
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ShopRouteActivatorService implements CanActivate{

    constructor(private router : Router){

    }

    canActivate(route: ActivatedRouteSnapshot){
        var token = localStorage.getItem("id_token");

        if(token == null){
            this.router.navigate(['login']);
        }
        return true;
    }


}