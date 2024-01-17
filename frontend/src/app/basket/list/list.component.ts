import { Component } from '@angular/core';
import { BasketService } from '../../basket.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  basket  = this.basketService.getBasket();

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    // Используем метод getBasket() вместо фиксированного массива
    

    // Если вам нужно также обновить корзину с сервера, используйте getBasketInfo
    this.basketService.getBasketInfo(this.basket).subscribe((data: any) => {
      // Обновляем basket после получения данных с сервера
      this.basket = data;
    });
  }
}
