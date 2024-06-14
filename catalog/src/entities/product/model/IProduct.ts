import { ISeller } from '../../seller/model/ISeller';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  seller: ISeller;
}
