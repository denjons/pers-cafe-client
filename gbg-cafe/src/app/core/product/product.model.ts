import { Category } from "../shop/category.model";

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
    category: Category;

    category_id: number;

    constructor(){

    }
   
}