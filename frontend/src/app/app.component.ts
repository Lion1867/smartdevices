import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { Router, NavigationEnd } from '@angular/router';

import { BasketService } from './basket.service';
import { FavorService } from './favor.service';

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
  price: number; 
  discount_percentage: number; 
  discounted_price: number; 
  isHovering?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
  providers: [BasketService, FavorService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  private previousUrl: string | null = null;

  title = 'frontend';

  products: Product[] = [];  
  name = ''; 

  categories: Category[] = [];

  basket: any[] = [];

  favor: any[] = [];
  
  getCategoryList() {
    return this.http.get('http://127.0.0.1:8989/v1/generic/category_list');
  }

  constructor(private http: HttpClient, private router: Router, private basketService: BasketService, private favorService: FavorService) {
    this.http.get('http://127.0.0.1:8989/v1/generic/product_list?limit=68').subscribe((data: any) => {
      console.log(data);
      this.products = data.results.map((productItem: Product) => ({ ...productItem, isHovering: false }));
    });

    this.getCategoryList().subscribe((res: any) => {
      this.categories = res;
    }); 
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/catalog' && this.previousUrl) {
          // Переход на страницу catalog с другой страницы
          window.location.reload();
        }
        this.previousUrl = event.url;
      }
    });

    this.basketService.basket$.subscribe((data) => {
      this.basket = data;
    })

    this.favorService.favor$.subscribe((data) => {
      this.favor = data;
    })
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}
