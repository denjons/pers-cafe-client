import { Category } from "../shop/category.model";
import { SalesTax } from "../shop/sales-tax.model";

export class Product{

    id : number;
    shopId : number;
    name : string;
    description : string;
    size : string;
    price : number;
    quantity: number;
    active: boolean;
    date: Date;
    img : string;
    salesTax: SalesTax;

    category: Category;
    category_id: number;

    constructor(){

    }
   
}