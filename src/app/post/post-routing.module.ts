import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostListComponent } from "./post-list/post-list.component";

const routes: Routes = [
  {
    path: 'posts',
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
      // isLogged: true
    }
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent
  },
];

export const PostRoutingModule = RouterModule.forChild(routes);