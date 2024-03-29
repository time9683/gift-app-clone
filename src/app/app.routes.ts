import { Routes } from '@angular/router';

export const routes: Routes = [

{
     path:"",
     loadComponent: () =>  import('./home/home.component').then(m => m.HomeComponent)
},
{
    path: "gif/:id",
    loadComponent:() => import('./gif/gif.component').then(m => m.GifComponent)
},
{
    path: "**",
    loadComponent:() => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
},
// {
//     path:"**",
//     redirectTo:"hola"
// }


];
