import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../models/Campaign";
import {Seller} from "../../models/Seller";
import {CampaignService} from "../../service/campaign.service";
import {SellerService} from "../../service/seller.service";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = true;
  campaigns!: Campaign[];
  isUserDataLoaded = true;
  seller!: Seller;

  constructor(private campaignService: CampaignService,
              private sellerService: SellerService,
              private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns()
      .subscribe(data => {
        console.log(data);
        this.campaigns = data;
        this.getProductsToCampaigns(this.campaigns);
        this.isPostsLoaded = true;
      });

    this.sellerService.getCurrentSeller()
      .subscribe(data => {
        console.log(data);
        this.seller = data;
        this.isUserDataLoaded = true;
      })
  }

  getProductsToCampaigns(campaigns: Campaign[]): void {
    campaigns.forEach(p => {
      this.productService.getProductsToCampaign(p.id)
        .subscribe(data => {
          p.products = data
        })
    });
  }

  postProduct(name: string, campaignId: number, campaignIndex: number): void {
    const campaign = this.campaigns[campaignIndex];

    console.log(campaign);
    this.productService.addProductToCampaign(campaignId, name)
      .subscribe(data => {
        console.log(data);
        campaign.products!.push(data);
      });
  }

}
