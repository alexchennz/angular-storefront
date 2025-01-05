import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../../types';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products:Product[] = []
  totalRecords:number = 0
  rows:number = 6
  displayEditPopup: boolean = false
  displayAddPopup: boolean = false
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0
  }


  constructor(private productService: ProductsService){}

  ngOnInit():void{
    this.fecthProducts(0, this.rows)
  }

  fecthProducts(page: number, perPage: number){
    this.productService.getProducts('http://localhost:3000/clothes', {page, perPage}).subscribe({
      next: (data: Products)=>{
          this.products = data.items
          this.totalRecords = data.total
          console.log("total:",this.totalRecords);
      },
      error: (error)=>{

      }
    })
  }

  addProduct(product: Product){
    this.productService.addProduct('http://localhost:3000/clothes/', product).subscribe(
      {
        next: (data)=>{
          console.log(data)
          // this.totalRecords += 1
          console.log(this.totalRecords);
          this.fecthProducts(0, this.rows)
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )
  } 

  editProduct(product: Product, id:number){
    this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data)=>{
          console.log(data)
          this.fecthProducts(0, this.rows)
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )
  }  

  deleteProduct(id:number){
    this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
      {
        next: (data)=>{
          console.log(data)
          this.fecthProducts(0, this.rows)
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )
  } 

  onConfirmEdit(product: Product){
    if(!this.selectedProduct.id){
      return
    }
    this.editProduct(product, this.selectedProduct.id)
    this.displayEditPopup = false
  }

  onConfirmAdd(product: Product){
    this.addProduct(product)
    this.displayAddPopup = false
  }

  toggleEditPopup(product: Product){
    this.selectedProduct = product
    this.displayEditPopup = true
  }

  toggleDeletePopup(product: Product){
    // this.selectedProduct = product
    if(!product.id){
      return
    }
    this.deleteProduct(product.id)
  }

  toggleAddPopup(){
    this.displayAddPopup = true
  }

  onProductOutput(product: Product){
    // console.log("Output product", product)
  }

  onPageChange(event: any){
    this.fecthProducts(event.page, event.rows)
  }
}
