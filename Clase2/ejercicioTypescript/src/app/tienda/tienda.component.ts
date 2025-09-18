import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product, CartItem } from '../interfaces/product.interface';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  cart: CartItem[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedCategory: string = 'all';

  constructor(private productService: ProductService) {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
        console.log('Productos cargados:', this.products);
      },
      error: (error) => {
        this.error = 'Error al cargar productos: ' + error.message;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = categories;
        console.log('Categorías cargadas:', this.categories);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.selectedProduct = null;

    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
    
    console.log('Producto agregado al carrito:', product.title);
    console.log('Carrito actual:', this.cart);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
  }

  checkout() {
    alert('Procediendo al pago. Total a pagar: $' + this.getTotalPrice().toFixed(2));
    this.clearCart();
  }

  formatCategory(category: string): string {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  getStarRating(rate: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('fas fa-star');
    }
    
    if (hasHalfStar) {
      stars.push('fas fa-star-half-alt');
    }
    
    const emptyStars = 5 - Math.ceil(rate);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('far fa-star');
    }
    
    return stars;
  }
}
