import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: any = null;
  @Output() formSubmit = new EventEmitter<any>();

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });
    console.log('product', this.product);
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  submitForm(): void {
    
    if (this.productForm.valid) {
      const formData = this.productForm.value;

    if (this.product && this.product.id) {
      // If editing, preserve the original product ID
      formData.id = this.product.id;
    }

    this.formSubmit.emit(formData);

    }
  }

  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit(); 
  }
}
