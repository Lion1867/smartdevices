import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {path: '', component: EditComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class ProfileModule { }
