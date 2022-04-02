import { RouterModule, Routes } from "@angular/router";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { CommentListComponent } from "./comment-list/comment-list.component";

const routes: Routes = [
  {
    path: 'posts/:id',
    children: [
      {
        path: 'comments',
        component: CommentListComponent,
        data: {
          isAuth: true,
          title: 'Inspiration | Comments'
        }
      }
    ]
  },
  // {
  //   path: 'posts/:id/comments',
  //   component: CommentCreateComponent
  // }
];

export const CommentRoutingModule = RouterModule.forChild(routes);