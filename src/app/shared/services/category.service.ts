import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
categories : AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    // . the problem is with .valueChanges() because it returns only data and not meta data.
    this.categories =  this.db.list('/categories',ref => ref.orderByChild('name'));
    return this.categories
    .snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }
}
