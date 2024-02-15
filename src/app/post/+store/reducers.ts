import { createFeature, createReducer, on } from '@ngrx/store';
import { IPostState } from '../interfaces/post-state.interface';
import { postActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: IPostState = {
  isLoading: false,
  error: null,
  data: null,
  post: null,
};

const postFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(postActions.getPosts, (state) => ({ ...state, isLoading: true })),
    on(postActions.getPostsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.posts,
    })),
    on(postActions.getPostsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.message,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: postFeatureKey,
  reducer: postReducer,
  selectIsLoading,
  selectError,
  selectData: selectPostsData,
  selectPost,
} = postFeature;
