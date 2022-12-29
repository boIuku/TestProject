import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../models/Campaign";
import {CampaignService} from "../../service/campaign.service";
import {ProductService} from "../../service/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditCampaignComponent} from "../edit-campaign/edit-campaign.component";

@Component({
  selector: 'app-seller-campaigns',
  templateUrl: './seller-campaigns.component.html',
  styleUrls: ['./seller-campaigns.component.css']
})
export class SellerCampaignsComponent implements OnInit {

  isSellerCampaignLoaded = false;
  campaigns!: Campaign [];

  constructor(private campaignService: CampaignService,
              private productService: ProductService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns()
      .subscribe(data => {
        console.log(data);
        this.campaigns = data;
        this.getProductsToCampaign(this.campaigns);
        this.isSellerCampaignLoaded = true;
      });
  }

  getProductsToCampaign(campaigns: Campaign[]): void {
    campaigns.forEach(p => {
      this.productService.getProductsToCampaign(p.id)
        .subscribe(data => {
          p.products = data;
        });
    });
  }

  removeCampaign(campaign: Campaign, index: number): void {
    console.log(campaign);
    const result = confirm('Do you really want to delete this campaign?');
    if (result) {
      this.campaignService.deleteCampaign(campaign.id)
        .subscribe(() => {
          this.campaigns.splice(index, 1);
        });
    }
  }

  openEditDialog(campaign: Campaign): void {
    const dialogCampaignEditConfig = new MatDialogConfig();
    dialogCampaignEditConfig.width = '400px';
    dialogCampaignEditConfig.data = {
      campaignId: campaign.id
    };
    this.dialog.open(EditCampaignComponent, dialogCampaignEditConfig);
  }

  deleteProduct(productId: number, campaignIndex: number, productIndex: number): void {
    const campaign = this.campaigns[campaignIndex];

    this.productService.deleteProduct(productId)
      .subscribe(() => {
        // @ts-ignore
        campaign.products.splice(productIndex, 1);
      });
  }

}
