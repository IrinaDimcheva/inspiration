import { createFeature, createReducer, on } from '@ngrx/store';
import { postActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { IPostState } from '../interfaces/post-state.interface';

const initialState: IPostState = {
  isSubmitting: false,
  isLoading: false,
  errors: null,
  data: null,
};

const postFeature = createFeature({
  name: 'post',
  reducer: createReducer(
    initialState,
    on(postActions.getPost, (state) => ({ ...state, isLoading: true })),
    on(postActions.getPostSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.post,
    })),
    on(postActions.getPostFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.message,
    })),
    on(postActions.createPost, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(postActions.createPostSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(postActions.createPostFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.message,
    })),
    on(postActions.updatePost, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(postActions.updatePostSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(postActions.updatePostFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.message,
    }))
  ),
});

export const {
  name: postFeatureKey,
  reducer: postReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectErrors,
  selectData: selectPostData,
} = postFeature;
