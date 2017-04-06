import { Product } from '../product/product.model';

export class CartItem{

    product: Product;
    quantity: number;

    constructor(){
        this.quantity = 0; 
    }

    public increase(){
        if(this.product.active){
            this.addproduct(this.product);
        }
    }

    public decrease(){
        this.product.quantity = this.product.quantity  - 1;
        this.quantity = this.quantity - 1;
    }

    public addproduct(product: Product){
        if(this.product == null){
            this.product = product;
        }
        this.product.quantity = this.product.quantity - 1;
        this.quantity = this.quantity + 1;

    }

}