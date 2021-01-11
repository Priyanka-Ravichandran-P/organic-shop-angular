import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/products';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product') product : Product;
@Input('show-actions') showActions : Boolean;
@Input('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private cartService : ShoppingCartService) {
   
   }

  // We dont want any result back so we are not awaiting it
  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
  ngOnInit(): void {
  }

}
