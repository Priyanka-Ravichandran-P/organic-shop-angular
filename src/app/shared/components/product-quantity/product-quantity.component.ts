import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/products';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product : Product;
  @Input('shopping-cart') shoppingCart : ShoppingCart;
  
    constructor(private cartService : ShoppingCartService) {
     
     }
  
    // We dont want any result back so we are not awaiting it
    
    addToCart(){
     return this.cartService.addToCart(this.product);
    }
    removeFromCart(){
     return this.cartService.removeFromCart(this.product);
    }
    // getQuantity(){
    //   console.log("xkjghdfhgud::", this.shoppingCart);
    //   if(!this.shoppingCart) return 0;
    //   let item = this.shoppingCart.items[this.product.key];
    //   return item ? item.quantity : 0;
    // }
    ngOnInit(): void {
    
      // console.log("product quantity shopping cart:: ",this.shoppingCart );
      // console.log("product:::", this.product);
    }
  
}
