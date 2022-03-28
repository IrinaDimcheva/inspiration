import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'posts/new',
    component: PostCreateComponent
  }
];

export const PostRoutingModule = RouterModule.forChild(routes);