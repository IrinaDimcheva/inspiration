import { IPost, IUser } from '../../shared/interfaces';

export interface IAuthState {
  isSubmitting: boolean;
  isLoading: boolean;
  user: IUser | null;
  errors: string | null;
  data: IPost[] | null;
}
