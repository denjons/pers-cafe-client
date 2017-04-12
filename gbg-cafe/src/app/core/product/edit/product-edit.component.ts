import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';


@Component({
    selector: "",
    templateUrl: "",
    styles: [] 

})
export class ProductEditComponent{
    @Input() product: Product;
    @Output() onEditSave: EventEmitter<any>;

    constructor(private productService: ProductService){

    }

    editSave(){

    }

}