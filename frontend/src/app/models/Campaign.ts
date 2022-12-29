import {Product} from "./Product";

export interface Campaign {
  id?: number;
  name: string;
  keywords: string[];
  bid: number;
  campaignFund: number;
  status: boolean;
  town: string;
  radius: number;
  products?: Product [];
}
