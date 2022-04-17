import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { CommentEditComponent } from "./comment-edit/comment-edit.component";
import { CommentListComponent } from "./comment-list/comment-list.component";

const routes: Routes = [
  {
    path: 'posts/:id',
    children: [
      {
        path: 'comments',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: CommentListComponent,
        data: {
          isAuth: true,
          title: 'Inspiration | Comments'
        }
      },
      {
        path: 'comments/new',
        canActivate: [AuthGuard],
        component: CommentCreateComponent,
        data: {
          title: 'Inspiration | Comments'
        }
      },
      {
        path: 'comments/:commentId/edit',
        canActivate: [AuthGuard],
        component: CommentEditComponent,
        data: {
          title: 'Inspiration | Edit Comment'
        }
      },
    ]
  }
];

export const CommentRoutingModule = RouterModule.forChild(routes);