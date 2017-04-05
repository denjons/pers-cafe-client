import { Product } from '../product/product.model';

export class Category{
    id: number;
    name: string;
    image: string;
    description : string;
    products: Product[];
    imgElm: string;
}