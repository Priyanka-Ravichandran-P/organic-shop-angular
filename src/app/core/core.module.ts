import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports:[
    NavBarComponent
  ]
})
export class CoreModule { }
