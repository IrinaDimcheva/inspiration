import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  post: IPost | any;
  form: UntypedFormGroup;
  isLoading = false;
  isEditMode = false;
  postId: string;
  isLogged;
  tagList: string[] = [
    'art',
    'books',
    'crafts',
    'cuisine',
    'culture',
    'fashion',
    'fun',
    'music',
    'movies',
    'nature',
    'photography',
    'programming',
    'science',
    'social',
    'sports',
    'travel',
    'wellbeing',
    'wildlife',
    'work',
  ];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
    this.isLogged = this.userService.isLogged;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50000),
        ],
      ],
      imageUrl: ['', [Validators.required, Validators.pattern('^https*://.+')]],
      tag: ['', [Validators.required]],
    });
    this.postId = this.route.snapshot.params['id'];
    if (this.postId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.postService.loadPostById(this.postId).subscribe({
        next: (postData) => {
          this.isLoading = false;
          this.post = {
            title: postData.title,
            content: postData.content,
            imageUrl: postData.imageUrl,
            tag: postData.tag,
          };
          setTimeout(() => {
            this.form.patchValue(this.post);
          });
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.isEditMode = false;
      this.postId = null;
    }
  }

  createHandler() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const post: IPost | any = {
      title: this.form.value.title,
      content: this.form.value.content,
      imageUrl: this.form.value.imageUrl,
      tag: this.form.value.tag,
    };
    if (!this.isEditMode) {
      this.postService.addPost(post).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    } else {
      this.postService.editPost(this.postId, post).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    }
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
