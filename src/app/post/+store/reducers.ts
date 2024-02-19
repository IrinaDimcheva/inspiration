import { createFeature, createReducer, on } from '@ngrx/store';
import { postActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { IPostState } from '../interfaces/post-state.interface copy';

const initialState: IPostState = {
  isLoading: false,
  error: null,
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
  selectData: selectPostData,
} = postFeature;
