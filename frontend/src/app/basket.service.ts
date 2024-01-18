import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private _basket: number[] = []; 

  basket$ = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) {
    // Проверяем доступность localStorage
    if (typeof localStorage !== 'undefined') {
      // Загружаем сохраненную корзину из localStorage
      const storedBasket = localStorage.getItem('basket');
      if (storedBasket) {
        this._basket = JSON.parse(storedBasket);
        this.basket$.next(this._basket);
      }
    }
  }

  addToBasket(id: number) {
    if (!this.isInBasket(id)) {
      this._basket.push(id);
      this.saveToLocalStorage();
    }
    this.basket$.next(this._basket);
  }

  isInBasket(value: number) {
    return this._basket.indexOf(value) > -1;
  }

  delFromBasket() {
    this._basket = [];
    this.saveToLocalStorage();
    this.basket$.next(this._basket);
  }

  submitBasket() {
    // Добавьте здесь логику для отправки корзины на сервер, если необходимо
  }

  getBasketInfo(pars: number[]) {
    const data = { ids: pars };
    return this.http.post(`http://127.0.0.1:8989/v1/generic/basket_list`, data);
  }

  getBasket() {
    return this._basket;
  }

  private saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('basket', JSON.stringify(this._basket));
    }
  }
  
}