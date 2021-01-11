import { Product } from './products';
export class ShoppingCartItems{
    key:string;
    imageUrl:string;
    title:string;
    price:number;
    quantity:number;
    
    constructor(init?: Partial<ShoppingCartItems>){
        Object.assign(this,init);
    }

    get totalPrice(){
        return this.price * this.quantity;
    }

}


   