import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule, ToastModule, CurrencyPipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService){}
  @Input() product!:Product
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>()
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>()
  @ViewChild('deleteButton') deleteButton: any

  ngOnInit(){
    
  }

  editProduct(){
    this.edit.emit(this.product)
  }

  confirmDelete(){
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message:"Are you sure you want to delete this product?",
      accept: ()=>{
        this.deleteProduct()
      }
    })
  }

  deleteProduct(){
    this.delete.emit(this.product)
  }
}
