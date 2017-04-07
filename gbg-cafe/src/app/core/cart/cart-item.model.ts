import { Product } from '../product/product.model';

export class CartItem{

    product: Product;
    quantity: number;
    productId: number;

    constructor(){
        this.quantity = 0; 
    }

    public increase(){
        if(this.product.quantity <= 0){
            return false;
        }
        this.increaseQuantity();
        return true;
    }

    public decrease(){
        this.product.quantity ++;
        this.quantity --;

    }

    public reset(){
        this.product.quantity = this.product.quantity + this.quantity;
        this.quantity = 0;
    }

    public addproduct(product: Product){
        if(this.product == null){
            this.product = product;
            this.productId = product.id;
        }
        this.increaseQuantity();
    }

    private increaseQuantity(){
        this.product.quantity --;
        this.quantity ++;
    }

}