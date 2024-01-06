import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend';

  products = [];  

  constructor(private http: HttpClient) {
    this.http.get('http://127.0.0.1:8989/v1/generic/product_list?limit=73').subscribe((data: any) => {
      console.log(data);
      this.products = data;
    });
  }
}
