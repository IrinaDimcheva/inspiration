import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRegisterRequest } from '../interfaces/register-request';
import { IUser } from '../../shared/interfaces';
import { ILoginRequest } from '../interfaces/login-request';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: IRegisterRequest }>(),
    'Register success': props<{ user: IUser }>(),
    'Register failure': props<{ message: string }>(),

    Login: props<{ request: ILoginRequest }>(),
    'Login success': props<{ user: IUser }>(),
    'Login failure': props<{ message: string }>(),

    'Get user': emptyProps(),
    'Get user success': props<{ user: IUser }>(),
    'Get user failure': emptyProps(),

    Logout: emptyProps(),
    'Logout success': emptyProps(),
    'Logout failure': props<{ message: string }>(),
  },
});
