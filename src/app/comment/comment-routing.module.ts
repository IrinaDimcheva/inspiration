import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { CommentEditComponent } from "./comment-edit/comment-edit.component";
import { CommentListComponent } from "./comment-list/comment-list.component";

const routes: Routes = [
  {
    path: 'posts/:id/comments',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CommentListComponent,
    data: {
      isLogged: true,
      title: 'Inspiration | Comments'
    }
  },
  {
    path: 'posts/:id/comments/new',
    canActivate: [AuthGuard],
    component: CommentCreateComponent,
    data: {
      isLogged: true,
      title: 'Inspiration | Comments'
    }
  },
  {
    path: 'posts/:id/comments/:commentId/edit',
    canActivate: [AuthGuard],
    component: CommentEditComponent,
    data: {
      isLogged: true,
      title: 'Inspiration | Edit Comment'
    }
  }
];

export const CommentRoutingModule = RouterModule.forChild(routes);