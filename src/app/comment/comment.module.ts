import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { MaterialModule } from '../material.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentService } from './comment.service';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CommentRoutingModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
