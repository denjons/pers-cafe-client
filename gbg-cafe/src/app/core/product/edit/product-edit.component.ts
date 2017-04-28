import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Category } from "../../shop/category.model";


@Component({
    selector: "product-edit",
    templateUrl: "product-edit.component.html",
    styles: [] 

})
export class ProductEditComponent implements OnInit{

    @Input() product: Product;
    @Output() onEditSave = new EventEmitter;
    @Output() onMoveToTrash = new EventEmitter;
    @Output() onClose = new EventEmitter;

    editedProduct: Product;

    constructor(private productService: ProductService){

    }

    ngOnInit(){
        this.editedProduct = new Product();
        this.productService.copy(this.product, this.editedProduct);
        console.log("init product edit item.");
    }

    moveToTrash(){
        this.onMoveToTrash.emit(this.product);
    }

    editSave(){
        this.onEditSave.emit({"edited":this.editedProduct,"original":this.product});
    }

    clear(){
        this.product = null;
        this.editedProduct = new Product();
    }

    close(){
        this.onClose.emit();
    }
}