import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

import { FavorService } from '../favor.service';
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
  providers: [FavorService]
})

export class FavorModule { 

  favor = [];

  constructor(private favorService: FavorService)
   {
 
   }

}
