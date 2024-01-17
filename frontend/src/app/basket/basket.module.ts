import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
const routes: Routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BasketModule { }
