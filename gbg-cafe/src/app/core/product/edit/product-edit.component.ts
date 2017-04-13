import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Category } from "../../shop/category.model";


@Component({
    selector: "",
    templateUrl: "",
    styles: [] 

})
export class ProductEditComponent{
    
    @Input() product: Product;
    @Input() categories: Category[];
    @Output() onEditSave: EventEmitter<any>;

    constructor(private productService: ProductService){

    }

    editSave(){

    }

}