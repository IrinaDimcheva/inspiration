import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { CommentListComponent } from "./comment-list/comment-list.component";

const routes: Routes = [
  {
    path: 'posts/:id',
    canActivateChild: [AuthGuard],
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
  //   component: CommentCreateComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     isAuth: true,
  //     title: 'Inspiration | Comments'
  //   }
  // }
];

export const CommentRoutingModule = RouterModule.forChild(routes);