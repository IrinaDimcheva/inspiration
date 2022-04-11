import { RouterModule, Routes } from "@angular/router";
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
    component: PostCreateComponent,
    data: {
      title: 'Inspiration | New Post',
    }
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent
  },
];

export const PostRoutingModule = RouterModule.forChild(routes);