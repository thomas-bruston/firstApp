import { Component,Input } from '@angular/core';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  // Classes communes à toutes les variantes
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:   'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger:    'bg-danger-500 text-white hover:bg-danger-600',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get classes(): string {
    return buttonVariants({ variant: this.variant, size: this.size });
  }
}
