import { ShoppingCartItems } from './shoppingCartItems';
export class ShoppingCart{
    dateCreated ;
     items : ShoppingCartItems[] = [];
    // constructor(private itemsMap: {[productId :string]: ShoppingCartItems}){
    //     this.itemsMap = itemsMap || {};

    //     for(let productId in itemsMap){
    //         let item: ShoppingCartItems = itemsMap[productId];
    //         this.items.push(new ShoppingCartItems({...item}));
    //     }
    // };
    constructor(private  itemsArr : ShoppingCartItems[]){
        this.items = itemsArr || [];
        //this.items = itemsArr;
            // for(let productId in itemsArr){
            //     let item: ShoppingCartItems = itemsArr[productId];
            //     this.items.push(new ShoppingCartItems({...item}));
            // }
    }
    get productIds(){
        let object = Object.keys(this.items);
        console.log("Object$ ", object);
        return object;
    }
    get totalItemsCount(){
        let count = 0;
        for(let productId in this.items){
            count += this.items[productId].quantity;
        }
        return count;
    };

    getQuantity(product){
        if(!product) return 0;
        else{
        
        let item = this.items[product.key];
        let quantity = item ? item.quantity : 0;
        return quantity;
        }
      }

      get CartTotalPrice(){
        let sum = 0;
        for(let productId in this.items){
            let item = this.items[productId];
            let cartItem =  new ShoppingCartItems({...item});
            sum += cartItem.totalPrice;
        }
        return sum;
      }
   
}