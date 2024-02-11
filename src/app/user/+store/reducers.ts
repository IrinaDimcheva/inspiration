import {
  createFeature,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { IAuthState } from '../interfaces/auth-state';
import { authActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  user: null,
  errors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: action.user,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.message,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: action.user,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.message,
    })),
    on(authActions.getUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      user: action.user,
    })),
    on(authActions.getUserFailure, (state, action) => ({
      ...state,
      isLoading: false,
      user: null,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      errors: null,
    })),
    on(authActions.logout, (state) => ({
      ...initialState,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectUser,
  selectErrors,
} = authFeature;
