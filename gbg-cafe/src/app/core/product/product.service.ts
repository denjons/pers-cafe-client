import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { Product } from './product.model';

@Injectable()
export class ProductService{
   
    constructor(private http: Http){
        console.log("constructed");
    }



    getProductsForShop(){

        var shop_id = localStorage.getItem("shop_id");
        var token = localStorage.getItem("id_token");

        console.log("from localstorage");
        console.log("shop "+shop_id);
        console.log("token: "+token);

        var poducts = new Array();

        for(var i=0; i < 10; i ++){

            var prod = new Product();
            prod.name = "product "+i;
            prod.description = "this is product "+i;
            prod.quantity = i+1;
            prod.price = (i+2)/3;

            prod.price = Number.parseFloat(prod.price.toFixed(2));

            poducts[i] = prod;
        }

        return poducts;
    }


}