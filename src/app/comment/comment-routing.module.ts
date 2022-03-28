import { RouterModule, Routes } from "@angular/router";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { CommentsComponent } from "./comments/comments.component";

const routes: Routes = [
  {
    path: 'posts/:id',
    component: CommentsComponent
  },
  {
    path: 'posts/:id/comments',
    component: CommentCreateComponent
  }
];

export const CommentRoutingModule = RouterModule.forChild(routes);