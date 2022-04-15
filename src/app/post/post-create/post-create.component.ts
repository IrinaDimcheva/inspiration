import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  post: IPost | any;
  isLoading = false;
  isEditMode = false;
  postId: string;
  isLogged = this.userService.isLogged;
  tagList: string[] = [
    'art',
    'books',
    'crafts',
    'cuisine',
    'culture',
    'fun',
    'music',
    'nature',
    'photography',
    'programming',
    'science',
    'sports',
    'travel',
    'wellbeing',
    'work'
  ];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true;
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postService.loadPostById(this.postId).subscribe({
          next: postData => {
            console.log(postData);
            this.isLoading = false;
            this.post = {
              title: postData.title,
              content: postData.content,
              imageUrl: postData.imageUrl,
              tag: postData.tag
            };
            setTimeout(() => {
              this.form.setValue(this.post);
            });
          }, error: err => {
            console.log(err);
            this.isLoading = false;
          }
        });
      } else {
        this.isEditMode = false;
        this.postId = null;
      }
    });
  }

  createHandler() {
    if (this.form.invalid) { return; }
    const post: any = {
      title: this.form.value.title,
      content: this.form.value.content,
      imageUrl: this.form.value.imageUrl,
      tag: this.form.value.tag
    };
    this.isLoading = true;
    this.postService.addPost(post).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
    this.form.resetForm();
  }

  resetForm() {
    this.form.resetForm();
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import { IPost } from '../../shared/interfaces';
// import { PostService } from '../../core/services/post.service';
// import { UserService } from 'src/app/core/services/user.service';

// @Component({
//   selector: 'app-post-create',
//   templateUrl: './post-create.component.html',
//   styleUrls: ['./post-create.component.css']
// })
// export class PostCreateComponent implements OnInit {
//   post: IPost;
//   // form: FormGroup;
//   isLoading = false;
//   isEditMode = false;
//   postId: string;
//   isLogged = this.userService.isLogged;
//   // tags = new FormControl();
//   tagList: string[] = [
//     'art',
//     'books',
//     'crafts',
//     'cuisine',
//     'culture',
//     'fun',
//     'music',
//     'nature',
//     'photography',
//     'programming',
//     'science',
//     'sports',
//     'travel',
//     'wellbeing',
//     'work'
//   ];

//   constructor(
//     private postService: PostService,
//     private userService: UserService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private fb: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(5)]],
//       content: ['', [Validators.required, Validators.minLength(10)]],
//       imageUrl: ['', [Validators.required, Validators.pattern('^https*:\/\/.+')]],
//       tags: ['', [Validators.required]]
//     });
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {

//     })
//   }

//   createHandler(form: NgForm) {
//     if (this.form.invalid) { return; }
//     const post: IPost = {
//       title: form.value.title,
//       content: form.value.content,
//       imageUrl: form.value.imageUrl
//     };
//     this.isLoading = true;
//     this.postService.addPost(post).subscribe({
//       next: () => {
//         this.isLoading = false;
//         this.router.navigate(['/posts']);
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//     this.form.reset();
//   }

//   resetForm() {
//     this.form.reset();
//   }

//   cancelHandler() {
//     this.router.navigate(['../'], { relativeTo: this.route });
//   }
// }
