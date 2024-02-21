import { IPost } from 'src/app/shared/interfaces';

export interface IPostState {
  isSubmitting: boolean;
  isLoading: boolean;
  errors: string | null;
  data: IPost | null;
}
