import { Product } from 'shared/models/products';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product   = {
    title:'',
    price: 0,
    category:'',
    imageUrl:''
  };
  id;
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private categoryService : CategoryService,
    private productService : ProductService) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.get(this.id).subscribe(p => {
        this.product = p ;
        console.log("product data while assigning $$$:",this.product.title+" ,"+this.product.price+" ,"+this.product.category+" ,"+this.product.imageUrl);
      } );
      }  
  }
  save(product){
    console.log("Saving Products as: ",product);
    if(this.id)
    this.productService.update(this.id, product);
    else
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(!(confirm('Are you sure want to delete this product?'))) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);    
  }
  ngOnInit(): void {
  }

}
