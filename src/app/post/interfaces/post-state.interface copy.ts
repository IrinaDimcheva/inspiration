import { IPost } from 'src/app/shared/interfaces';

export interface IPostState {
  isLoading: boolean;
  error: string | null;
  data: IPost | null;
}
