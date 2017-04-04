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
        var poducts = new Array();

        for(var i=0; i < 15; i ++){

            var prod = new Product();
            prod.name = "Produktnamn";
            prod.description = "Produkttyp "+ (i >= 10 ? ( i - 10) : i);
            prod.quantity = i+1;
            prod.price = ((i+20)/3) * (i % 10 === 0 ? 4 : 10);

            prod.price = Number.parseFloat(prod.price.toFixed(2));

            poducts[i] = prod;
        }

        return poducts;
    }


}