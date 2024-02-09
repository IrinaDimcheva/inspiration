import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interfaces/auth-state';
import { authActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  user: undefined,
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
    on(routerNavigationAction, (state) => ({
      ...state,
      errors: null,
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
