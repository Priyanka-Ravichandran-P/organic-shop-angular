import { Product } from 'shared/models/products';
import { map,switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }
  products : AngularFireList<any>;
  create(product){
    this.db.list('/products').push(product);
  }
  update(productId, product){
    return this.db.object('/products' + "/" + productId).update(product);
  }
  delete(productId){
    return this.db.object('/products' + "/" + productId).remove();
  }

  getAll(){
    this.products = this.db.list('/products');
    return this.products
    .snapshotChanges()
    .pipe(map(changes=>changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    }

    get(id) {
      return this.db.object('/products'+"/"+id).snapshotChanges().pipe(
        map(a => {
          const data = a.payload.val() as Product;
          console.log("payload data $$$:",data.title+" ,"+data.price+" ,"+data.category+" ,"+data.imageUrl);
        const id = a.payload.key;
        return { id, ...data };
        }));
    }
    
    
}
