import { IUser } from '../../user/model/IUser';

export interface IComment {
  id: string;
  body: string;
  date: string;
  user: IUser;
}
