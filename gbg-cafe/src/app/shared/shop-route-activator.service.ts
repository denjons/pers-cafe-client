
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ShopRouteActivatorService implements CanActivate{

    constructor(private router : Router){

    }

    canActivate(route: ActivatedRouteSnapshot){

        //console.log(route.pathFromRoot);
        var token = localStorage.getItem("id_token");
        console.log("id_token: "+token);
        if((token != null && token != undefined) && token.length < 20){
            console.log("navigate to login");
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }


}