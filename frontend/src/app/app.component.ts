import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: number;
  get_small_image_url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend';

  products: Product[] = [];  
  name = ''; 

  constructor(private http: HttpClient) {
    this.http.get('http://127.0.0.1:8989/v1/generic/product_list?limit=73').subscribe((data: any) => {
      console.log(data);
      this.products = data.results;
    });
  }

  doFind() {
    console.log(this.name);
    
    this.http.get(`http://127.0.0.1:8989/v1/generic/product_list?limit=73&searchkey=${this.name}`).subscribe((data: any) => {
      console.log(data);
      this.products = data.results;
    });

  }

}
