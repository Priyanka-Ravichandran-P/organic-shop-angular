import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartSubscription: Subscription;
  shoppingCart: ShoppingCart;
  items = [];

constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cartSubscription = await this.cartService.getCart()
      .then(x => x.subscribe(cart => {
        this.shoppingCart = new ShoppingCart(cart.items);
        let itemMap = this.shoppingCart.items;
        for (let key in itemMap) {
          let x = itemMap[key];
          this.items.push(new ShoppingCartItems({ ...x }));
        }
      }
      ));

  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}

