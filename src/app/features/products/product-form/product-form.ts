import { Component, OnInit, inject, Input, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductStore } from '../../../core/store/product.store';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit,DoCheck {
  @Input() id?: string;

  readonly store = inject(ProductStore);
  readonly router = inject(Router);

  isEditMode = false;

  form = new FormGroup({
    title:       new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price:       new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    category:    new FormControl('', Validators.required),
    thumbnail:   new FormControl('', Validators.required),
    stock:       new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    if (this.id) {
      this.isEditMode = true;
      this.store.loadById(Number(this.id));
    }
  }

  // Remplir le form quand le produit est chargé en mode édition
 ngDoCheck(): void {
  if (this.isEditMode && this.store.selectedProduct() && !this.form.dirty) {
    const p = this.store.selectedProduct()!;
    this.form.patchValue({
      title:       p.title,
      description: p.description,
      price:       p.price,
      category:    String(p.category),
      thumbnail:   p.thumbnail,
      stock:       p.stock,
    });
  }
}

  // Getters pour accéder aux erreurs facilement dans le template
  get titleError(): string {
    const ctrl = this.form.get('title');
    if (ctrl?.touched && ctrl.hasError('required')) return 'Le titre est requis';
    if (ctrl?.touched && ctrl.hasError('minlength')) return 'Minimum 3 caractères';
    return '';
  }

  get descriptionError(): string {
    const ctrl = this.form.get('description');
    if (ctrl?.touched && ctrl.hasError('required')) return 'La description est requise';
    if (ctrl?.touched && ctrl.hasError('minlength')) return 'Minimum 10 caractères';
    return '';
  }

  get priceError(): string {
    const ctrl = this.form.get('price');
    if (ctrl?.touched && ctrl.hasError('required')) return 'Le prix est requis';
    if (ctrl?.touched && ctrl.hasError('min')) return 'Le prix doit être positif';
    return '';
  }

onSubmit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.getRawValue();

  if (this.isEditMode) {
    this.store.updateProduct({
      id: Number(this.id),
      title:       formValue.title ?? undefined,
      description: formValue.description ?? undefined,
      price:       formValue.price ?? undefined,
      category:    formValue.category ?? undefined,
      thumbnail:   formValue.thumbnail ?? undefined,
      stock:       formValue.stock ?? undefined,
    });
  } else {
    this.store.createProduct(formValue as any);
  }

  this.router.navigate(['/products']);
}}