// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { IComment } from 'src/app/shared/interfaces';
// import { UserService } from 'src/app/core/services/user.service';
// import { CommentService } from '../../core/services/comment.service';

// @Component({
//   selector: 'app-comment-list-item',
//   templateUrl: './comment-list-item.component.html',
//   styleUrls: ['./comment-list-item.component.css']
// })
// export class CommentListItemComponent implements OnInit {
//   @Input() comment: IComment;


//   constructor(
//     public userService: UserService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private commentService: CommentService
//   ) { }

//   ngOnInit(): void {
//     this.userId = this.userService.userId;
//     this.commentUserId = this.comment.userId._id;
//     this.isAuthor = this.userId == this.commentUserId;
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//       this.postId = paramMap.get('id');
//       this.commentId = paramMap.get('commentId');
//       console.log(this.postId, this.commentId);
//     });
//   }

//   editHandler() {
//     this.router.navigate([this.comment._id, 'edit'], { relativeTo: this.route });
//   }

//   deleteHandler(commentId: string) {
//     this.commentService.deleteComment(this.postId, commentId)
//       .subscribe({
//         next: data => {
//           // this.status = 'Delete successful';
//           console.log('Delete successful', data);

//         },
//         error: error => {
//           // this.errorMessage = error.message;
//           console.error('There was an error!', error);
//           this.router.navigateByUrl(`/posts${this.postId}/comments`, { skipLocationChange: true }).then(() => {
//             this.router.navigate(['../'], { relativeTo: this.route });
//           });
//         }
//       });
//   }
// }
