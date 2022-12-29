import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SellerService} from "./seller.service";
import {Seller} from "../models/Seller";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private http: HttpClient,
              private router: Router,
              private sellerService: SellerService) {
  }

  updatedSeller!: Seller;
  public seller: Seller = {} as Seller;

  changeBalance(campaignFund: number): void {
    this.getSeller(campaignFund);
  }

  withdraw(campaignFund: number): void {
    this.sellerService.updateSeller(this.updateSellerr(campaignFund, this.seller))
      .subscribe(data => {
        this.seller = data;
      })
    this.reloadPage();
  }

  getSeller(campaignFund: number): void {
    this.sellerService.getCurrentSeller()
      .subscribe(data => {
        this.seller = data;
        this.withdraw(campaignFund)
      });
  }

  private updateSellerr(campaignFund: number, seller: Seller): Seller {
    this.seller.name = seller.name;
    this.seller.surname = seller.surname;
    this.seller.emeraldFund = seller.emeraldFund - campaignFund;
    return this.seller;
  }

  reloadPage() {
    window.location.reload()
  }

}
