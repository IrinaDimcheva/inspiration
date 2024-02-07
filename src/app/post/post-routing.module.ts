import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';

const routes: Routes = [
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: PostListComponent,
    data: {
      title: 'Inspiration | Posts',
    },
  },
  {
    path: 'posts/new',
    canActivate: [AuthGuard],
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | New Post',
      isLogged: true,
      animation: '*',
    },
  },
  {
    path: 'posts/:id',
    canActivate: [AuthGuard],
    component: PostDetailComponent,
    data: {
      title: 'Inspiration | Post Detail',
      animation: '*',
    },
  },
  {
    path: 'posts/:id/edit',
    canActivate: [AuthGuard],
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | Edit Post',
      isLogged: true,
      animation: '*',
    },
  },
];

export const PostRoutingModule = RouterModule.forChild(routes);
