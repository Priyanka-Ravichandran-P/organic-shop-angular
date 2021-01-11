import { MyLinkRendererComponent } from 'shared/models/edit-link';
import { RouterModule } from '@angular/router';
import { Product } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit, ViewChild , AfterViewInit} from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit  {

  products : Product[] ;
  rowData : Product[];
  filteredProducts : Product[] ;
  subscription : Subscription;
  paginationPageSize;
  private paginationNumberFormatter;
  private gridApi;
  columnDefs = [
    { field: 'title' , sortable: true, filter:true, resizable: true},
    { field: 'price' , sortable: true, filter:true, resizable: true},
    { field: 'action', resizable: true,
    cellRendererFramework : MyLinkRendererComponent,
      cellRendererParams : {
          inRouterLink: "/admin/products/"
        }},
   
    ];

  constructor(private productService : ProductService) {
    this.subscription =  this.productService.getAll().subscribe( p =>
      {
      this.filteredProducts = this.products = p ;
      this.rowData = this.filteredProducts;
     this.paginationPageSize = 15
    //  this.paginationNumberFormatter = function (params) {
    //   return '[' + params.value.toLocaleString() + ']';
    // };
    }
    );
   }
  
   
   ngOnInit(): void {
    
  }


   filter(searchValue : string){
     console.log(searchValue);
    this.filteredProducts =  (searchValue) ?  
    this.products.filter( p =>
       p.title.toLocaleLowerCase().includes(searchValue))  : this.products;
   }
  //  onPageSizeChanged(newPageSize) {
  //   var value = newPageSize.value;
  //   console.log("info page sie:",value)
  //   this.gridApi.paginationSetPageSize(Number(value));
  // }
  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

}
