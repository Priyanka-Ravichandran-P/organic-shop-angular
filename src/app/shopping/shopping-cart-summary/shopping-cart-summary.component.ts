import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart : ShoppingCart;
  @Input('items') items : ShoppingCartItems[];
  constructor() {
   
  }

  ngOnInit(): void {
   console.log("summary :::::", this.items);
  }

}
