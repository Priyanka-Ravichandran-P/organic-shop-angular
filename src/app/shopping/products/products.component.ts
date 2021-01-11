import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { map,switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/products';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
products: Product[] = [];
filteredProducts: Product[] = [];
shoppingCart : ShoppingCart ;
category;
subscription : Subscription;

  constructor(private route: ActivatedRoute,
    private productsService: ProductService,
    private cartService: ShoppingCartService
  ) {

   }

   async ngOnInit() {
    this.subscription = await this.cartService.getCart()
    .then(x => x.subscribe( cart => this.shoppingCart = new ShoppingCart(cart.items)));
     this.populateProducts();
    //Press F2 to refactor methodName
    this.route.queryParamMap.subscribe( param =>{
     this.category = param.get('category');
     this.applyFilter();
     })
  }

  private populateProducts(){
    this.productsService.getAll().subscribe(p=>{
      this.filteredProducts = this.products = p;
     });

  }

  private applyFilter(){
    this.filteredProducts =  (this.category) ?
    this.products.filter(p => p.category === this.category ) : 
    this.products
  
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
