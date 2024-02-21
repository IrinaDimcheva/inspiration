import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IPost } from '../../../shared/interfaces';
import { PostService } from '../../services/post.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/user/+store/reducers';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectPostData } from '../../+store/reducers';
import { postActions } from '../../+store/actions';
import { ICreatePost } from '../../interfaces/create-post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  post: IPost | any;
  form: FormGroup;
  isLoading = false;
  isEditMode = false;
  postId: string;
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
  data$ = combineLatest({
    post: this.store.select(selectPostData),
    isSubmitting: this.store.select(selectIsSubmitting),
    isLogged: this.store.select(selectUser),
  });

  constructor(
    private postService: PostService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
    // this.isLoading = true;
    const post: ICreatePost = {
      title: this.form.value.title,
      content: this.form.value.content,
      imageUrl: this.form.value.imageUrl,
      tag: this.form.value.tag,
    };
    if (!this.isEditMode) {
      this.store.dispatch(postActions.createPost({ post }));
      // } else {
      //   this.postService.editPost(this.postId, post).subscribe({
      //     next: () => {
      //       this.isLoading = false;
      //       this.router.navigate(['../'], { relativeTo: this.route });
      //     },
      //     error: (err) => {
      //       this.isLoading = false;
      //       console.error(err);
      //     },
      //   });
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
