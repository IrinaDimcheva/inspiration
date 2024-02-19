import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: 'new',
    canActivate: [AuthGuard],
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | New Post',
      isLogged: true,
      animation: '*',
    },
  },
  {
    path: ':postId',
    canActivate: [AuthGuard],
    component: PostDetailComponent,
    data: {
      title: 'Inspiration | Post Detail',
      animation: '*',
    },
  },
  {
    path: ':postId/edit',
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
