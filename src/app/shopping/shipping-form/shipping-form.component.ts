import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ShippingDetails } from 'shared/models/ShippingDetails';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/Order';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart : ShoppingCart
  userId: string;
  userSubscription: Subscription;
  
  constructor( public shipping: ShippingDetails,
     private route: Router, private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.route.navigate(['/order-success', result.key]);
  }

  
}
