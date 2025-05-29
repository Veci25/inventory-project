import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from './product.service';
import { MatButtonModule } from '@angular/material/button';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantityInStock: number;
  category?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductTableComponent, ProductFormComponent, MatDialogModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[] = [];
  constructor(private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: import("./product.service").Product[]) => {
      this.products = data.map((product) => ({ ...product, id: product.id || 0 }) as Product);
    });
  }
  

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  


  showForm = false;
  selectedProduct: Product | null = null;
  selectedProductForDetails: any | null = null;

  onAddProduct() {
    this.selectedProduct = null; // Clear form for new product
    this.showForm = true;
  }

  onEditProduct(product: Product) {
    this.selectedProduct = { ...product }; 
    this.showForm = true;
  }

  onDeleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

  onFormSubmit(product: Product) {
    if (product.id) {
      this.productService.updateProduct(product.id, product).subscribe(() => {
        this.loadProducts();
        this.showForm = false;
      });
    } else {
      this.productService.createProduct(product).subscribe(() => {
        this.loadProducts();
        this.showForm = false;
      });
    }
  }

  onFormCancel() {
    this.showForm = false;
  }


  viewDetails(product: any) {
    this.dialog.open(ProductDetailsComponent, {
      data: product,
      width: '400px'
    });
  }

  closeDetails() {
    this.selectedProductForDetails = null;
  }

  generateNewId(): number {
    return this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }
}
