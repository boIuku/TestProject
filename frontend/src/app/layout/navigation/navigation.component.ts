import {Component, OnInit} from '@angular/core';
import {Seller} from "../../models/Seller";
import {Router} from "@angular/router";
import {SellerService} from "../../service/seller.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = true;
  isDataLoaded = true;
  seller!: Seller;

  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {

      this.sellerService.getCurrentSeller()
        .subscribe(data => {
          this.seller = data;
          this.isDataLoaded = true;
        })

  }

}
