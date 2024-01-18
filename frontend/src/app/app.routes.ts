import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', // редирект (перенаправление) со страницы по умолчанию на страницу catalog
        redirectTo: 'catalog',
        pathMatch: 'full', // полное совпадение путей
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)
    },
    {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
    },
    {
        path: 'favor',
        loadChildren: () => import('./favor/favor.module').then(m => m.FavorModule)
    }
];

