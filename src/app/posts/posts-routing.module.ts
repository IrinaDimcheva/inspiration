import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
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
];

export const PostsRoutingModule = RouterModule.forChild(routes);
