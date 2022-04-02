import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts',
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'Inspiration | About'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Inspiration | 404'
    }
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
