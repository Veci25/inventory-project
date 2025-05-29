import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbar
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  @Input() products: any[] = [];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<any>();

  displayedColumns: string[] = [
    'id', 'name', 'description', 'price', 'quantityInStock', 'category', 'actions'
  ];

  showDetails(product: any) {
    this.viewDetails.emit(product);
  }

  onEdit(product: any) {
    this.editProduct.emit(product);
  }

  onDelete(productId: number) {
    this.deleteProduct.emit(productId);
  }
}
