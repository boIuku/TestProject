import {Campaign} from "./Campaign";

export interface Seller {
  id: number;
  name: string;
  surname: string;
  emeraldFund: number;
  campaigns?: Campaign [];
}
