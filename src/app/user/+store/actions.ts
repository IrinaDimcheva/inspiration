import { createActionGroup, props } from '@ngrx/store';
import { IRegisterRequest } from '../interfaces/register-request';
import { IUser } from '../../shared/interfaces';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: IRegisterRequest }>(),
    'Register success': props<{ user: IUser }>(),
    'Register failure': props<{ message }>(),
  },
});
