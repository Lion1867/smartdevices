import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { BasketService } from '../basket.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule, ListComponent
  ],
  providers: [BasketService]
})
export class BasketModule { 

  basket = [];

  constructor(private basketService: BasketService)
   {
 
   }
}
