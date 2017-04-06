import { Shop } from './shop.model';

export class User{
    user_type: string;
    name: string;
    date: Date;
    shops: Shop[];
}