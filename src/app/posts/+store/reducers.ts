import { createFeature, createReducer, on } from '@ngrx/store';
import { IPostsState } from '../interfaces/posts-state.interface';
import { postActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: IPostsState = {
  isLoading: false,
  error: null,
  data: null,
};

const postsFeature = createFeature({
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
    }))
    // on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: postsFeatureKey,
  reducer: postsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPostsData,
} = postsFeature;
