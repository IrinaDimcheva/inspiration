import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { MaterialModule } from '../material.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentService } from './comment.service';



@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CommentRoutingModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
