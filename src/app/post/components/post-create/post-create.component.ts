import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IPost } from '../../../shared/interfaces';
import { selectUser } from 'src/app/user/+store/reducers';
import {
  selectIsLoading,
  selectIsSubmitting,
  selectPostData,
} from '../../+store/reducers';
import { postActions } from '../../+store/actions';
import { IPostRequest } from '../../interfaces/post-request';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  postId: string = this.route.snapshot.params['id'];
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
  initialValues$ = this.store.pipe(
    select(selectPostData),
    filter((post): post is IPost => post !== null),
    map((post: IPost) => {
      return {
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        tag: post.tag,
      };
    })
  );
  data$ = combineLatest({
    post: this.store.select(selectPostData),
    isSubmitting: this.store.select(selectIsSubmitting),
    isLoading: this.store.select(selectIsLoading),
    isLogged: this.store.select(selectUser),
    initialValues: this.initialValues$,
  });

  constructor(
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
    if (this.postId) {
      this.isEditMode = true;
      this.store.dispatch(postActions.getPost({ postId: this.postId }));
    } else {
      this.isEditMode = false;
      this.postId = null;
    }
  }

  createHandler() {
    if (this.form.invalid) {
      return;
    }
    const post: IPostRequest = {
      title: this.form.value.title,
      content: this.form.value.content,
      imageUrl: this.form.value.imageUrl,
      tag: this.form.value.tag,
    };
    if (!this.isEditMode) {
      this.store.dispatch(postActions.createPost({ post }));
    } else {
      this.store.dispatch(
        postActions.updatePost({ request: post, postId: this.postId })
      );
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
