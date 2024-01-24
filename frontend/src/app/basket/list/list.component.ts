import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  get_small_image_url: string;
  products: Product[];  // Добавьте это поле
}

interface Product {
  id: number;
  name: string;
  category: Category;
  get_small_image_url: string;
  price: number; 
  discount_percentage: number; 
  discounted_price: number; 
  isHovering?: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule,],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  selectedQuantities: { [productId: number]: number } = {}; // объект для хранения количества каждого товара
  quantityOptions: number[] = [1, 2, 3, 4, 5]; // варианты количества товара

  basket = this.basketService.getBasket();
  products: Product[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getBasketInfo(this.basket).subscribe((data: any) => {
      this.products = data;

      this.products.forEach((product: Product) => {
      if (!this.selectedQuantities.hasOwnProperty(product.id)) {
        this.selectedQuantities[product.id] = 1;
      }
    });
  });
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find((product: Product) => product.id === productId);
  }
  
  doDelFromBasket(productId: number) {
    this.basketService.delFromBasket(productId);
  }

  getIntValue(value: number): number {
    return Math.floor(value);
  }

  getSumOrder(): number {
    let total = 0;

    for (const productId of this.basket) {
      let product = this.getProductById(productId);

      if (product) {
        const quantity = this.selectedQuantities[productId] || 1; // если не установлено, используем значение по умолчанию 1
        total += product.discounted_price * quantity;
      }
    }

    return total;
  }
}