import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts',
    data: {
      animation: 'HomePage',
    },
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    component: AboutComponent,
    data: {
      animation: 'AboutPage',
      title: 'Inspiration | About',
    },
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'posts/:id/comments',
    loadChildren: () =>
      import('./comment/comment.module').then((m) => m.CommentModule),
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
    data: {
      title: 'Inspiration | 404',
    },
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
});
