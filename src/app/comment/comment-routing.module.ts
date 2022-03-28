import { RouterModule, Routes } from "@angular/router";
import { CommentsComponent } from "./comments/comments.component";

const routes: Routes = [
  {
    path: 'posts/:id',
    component: CommentsComponent
  }
];

export const CommentRoutingModule = RouterModule.forChild(routes);