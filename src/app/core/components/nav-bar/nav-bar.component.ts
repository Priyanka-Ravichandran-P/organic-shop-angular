import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { CartesianChartOptions } from 'ag-grid-community';
import { Product } from 'shared/models/products';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authUser: AppUser;
  // shoppingCartCount;
  cart = new ShoppingCart([]);

  constructor(private authService: AuthService,
    private cartService: ShoppingCartService) {
    authService.authfbUser.subscribe(user => { this.authUser = user; console.log(this.authUser) });
  
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      // this.shoppingCartCount = 0;
      let itemsMap: {
        [productId: string]: ShoppingCartItems;
    }

      for (let productId in cart.items) {
      itemsMap =  {productId : cart.items[productId]}
      }
      this.cart = new ShoppingCart(cart.items);
    })
  }

}
