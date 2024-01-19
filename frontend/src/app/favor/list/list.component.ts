import { Component, OnInit } from '@angular/core';
import { FavorService } from '../../favor.service'; 
import { BasketService } from '../../basket.service';
import { CommonModule } from '@angular/common';

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
  isHovering?: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  favor = this.favorService.getFavor();
  products: Product[] = [];

  constructor(private favorService: FavorService, private basketService: BasketService) { }

  ngOnInit() {
    this.favorService.getFavorInfo(this.favor).subscribe((data: any) => {
      this.products = data;
    });
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find((product: Product) => product.id === productId);
  }
  
  doDelFromFavor(productId: number) {
    this.favorService.delFromFavor(productId);
  }

  doAddToBasket(id: number) {
    this.basketService.addToBasket(id);
  }
}
