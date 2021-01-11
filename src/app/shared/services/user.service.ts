import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import *  as firebase from 'firebase';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user : firebase.default.User){
    console.log('saving user credentials');
    this.db.object('/users/'  + user.uid).update(
      {
        name : user.displayName,
        email : user.email
      }
    )

  }

  getUser(uid : String) : AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }
}
