import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { Product } from 'shared/models/products';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take, switchMap } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  products: AngularFireList<any>;

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    // console.log("mapping object cartId: ", cartId);
    return this.db.object('/shopping-carts' + "/" + cartId)
      .snapshotChanges().pipe(
        map(a => {
          const data = a.payload.val() as ShoppingCart;
          let cart = { ...data };
          let items: ShoppingCartItems[] = cart.items;

          let itemsMap: {
            [productId: string]: ShoppingCartItems
          };
          for (let product in items) {
            itemsMap = {
              [items[product].key]: items[product]
            }
          }
          let shoppingCart = new ShoppingCart(items);

          return { ...shoppingCart };
        }));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);

  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private async getOrCreateCartId(): Promise<String> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1),
      map(a => {
        const data = a.payload.val() as ShoppingCartItems;
        const id = a.payload.key;
        return { ...data };
      }))
      .subscribe(item => {
        let quantity = (item.quantity || 0) + change;
        if (item != null && quantity === 0) item$.remove();
        else {
          return item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          })

        }

      });
  }
}
