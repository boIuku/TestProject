import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CampaignService} from "../../service/campaign.service";
import {SellerService} from "../../service/seller.service";
import {Seller} from "../../models/Seller";
import {EditSellerComponent} from "../edit-seller/edit-seller.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isSellerDataLoaded = true;
  seller!: Seller;

  constructor(private campaignService: CampaignService,
              private dialog: MatDialog,
              private sellerService: SellerService) {
  }

  ngOnInit(): void {
    this.sellerService.getCurrentSeller()
      .subscribe(data => {
        this.seller = data;
        this.isSellerDataLoaded = true;
      });
  }

  openEditDialog(): void {
    const dialogSellerEditConfig = new MatDialogConfig();
    dialogSellerEditConfig.width = '400px';
    dialogSellerEditConfig.data = {
      seller: this.seller
    };
    this.dialog.open(EditSellerComponent, dialogSellerEditConfig);
  }
}
