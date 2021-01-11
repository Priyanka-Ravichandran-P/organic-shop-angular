import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
 cart:ShoppingCart;
 cartTotalPrice;
 totalItemsPerProduct;
 products:ShoppingCartItems[]=[];
  constructor(private cartService: ShoppingCartService){
  }

 async ngOnInit() {
  let cart$ = await this.cartService.getCart();
  cart$.subscribe(cart => {
    this.cart = new ShoppingCart(cart.items);
    this.cartTotalPrice = this.cart.CartTotalPrice
    let items  = [];
    this.products = [];
    for(let productId in this.cart.items){
                let item: ShoppingCartItems = this.cart.items[productId];
                item.key = productId;
                this.products.push(new ShoppingCartItems({...item}));
            }
    
  })
  }

  clearCart(){
    this.cartService.clearCart();
  }
 
}
