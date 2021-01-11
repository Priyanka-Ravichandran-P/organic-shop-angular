import { ShoppingCart } from './ShoppingCart';
import { ShoppingCartItems } from './shoppingCartItems';
export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        let itemMap = shoppingCart.items;
        let items = [];
        for (let key in itemMap) {
            items.push(itemMap[key]);
        }
       this.items = items.map(x => {
            let item = new ShoppingCartItems({ ...x });
            return {
                product: {
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice

            }
        })
    }
}