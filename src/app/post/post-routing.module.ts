import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";

const routes: Routes = [
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: PostListComponent,
    data: {
      title: 'Inspiration | Posts'
    }
  },
  {
    path: 'posts/new',
    canActivate: [AuthGuard],
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | New Post',
      isLogged: true
    }
  },
  {
    path: 'posts/:id',
    canActivate: [AuthGuard],
    component: PostDetailComponent,
    data: {
      title: 'Inspiration | Post Detail',
    }
  },
  {
    path: 'posts/:id/edit',
    canActivate: [AuthGuard],
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | Edit Post',
      isLogged: true
    }
  }
];

export const PostRoutingModule = RouterModule.forChild(routes);