import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavorService {

  private _favor: number[] = []; 

  favor$ = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) {
    // Проверяем доступность localStorage
    if (typeof localStorage !== 'undefined') {
      // Загружаем сохраненную корзину из localStorage
      const storedFavor = localStorage.getItem('favor');
      if (storedFavor) {
        this._favor = JSON.parse(storedFavor);
        this.favor$.next(this._favor);
      }
    }
  }

  addToFavor(id: number) {
    if (!this.isInFavor(id)) {
      this._favor.push(id);
      this.saveToLocalStorage();
    }
    this.favor$.next(this._favor);
  }

  isInFavor(value: number) {
    return this._favor.indexOf(value) > -1;
  }

  delFromFavor(id: number) {
    const index = this._favor.indexOf(id);
    if (index > -1) {
      this._favor.splice(index, 1);
      this.saveToLocalStorage();
      this.favor$.next(this._favor);
    }
  }

  submitFavor() {
    // Добавьте здесь логику для отправки корзины на сервер, если необходимо
  }

  getFavorInfo(pars: number[]) {
    const data = { ids: pars };
    return this.http.post(`http://127.0.0.1:8989/v1/generic/basket_list`, data);
  }

  getFavor() {
    return this._favor;
  }

  private saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favor', JSON.stringify(this._favor));
    }
  }

}
