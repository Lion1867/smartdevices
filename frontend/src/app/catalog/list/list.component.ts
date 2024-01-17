import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { BasketService } from '../../basket.service';

interface Category {
  id : number;
  name: string;
  get_small_image_url: string;
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
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  title = 'frontend';

  products: Product[] = [];  
  name = ''; 

  categories: Category[] = [];
  
  getCategoryList() {
    return this.http.get('http://127.0.0.1:8989/v1/generic/category_list');
  }

  constructor(private http: HttpClient, private basketService: BasketService) {
    this.http.get('http://127.0.0.1:8989/v1/generic/product_list?limit=68').subscribe((data: any) => {
      console.log(data);
      this.products = data.results.map((productItem: Product) => ({ ...productItem, isHovering: false }));
    });

    this.getCategoryList().subscribe((res: any) => {
      this.categories = res;
    });
  
}

doFind() {
  console.log(this.name);
  
  this.http.get(`http://127.0.0.1:8989/v1/generic/product_list?limit=68&searchkey=${this.name}`).subscribe((data: any) => {
    console.log(data);
    this.products = data.results.map((productItem: Product) => ({ ...productItem, isHovering: false }));
  });

}

doFind_1(categoryId: number) {
  console.log(this.name);
  
  this.http.get(`http://127.0.0.1:8989/v1/generic/product_list?limit=68&category=${categoryId}`).subscribe((data: any) => {
    console.log(data);
    
    this.products = data.results.map((productItem: Product) => ({ ...productItem, isHovering: false }));

  });

}
  
  doAddToBasket(id: number) {
    this.basketService.addToBasket(id);
  }

}


