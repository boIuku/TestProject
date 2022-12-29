import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Seller} from "../../models/Seller";
import {SellerService} from "../../service/seller.service";
import {Campaign} from "../../models/Campaign";
import {CampaignService} from "../../service/campaign.service";
import {BalanceService} from "../../service/balance.service";

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {

  public campaignEditForm!: FormGroup;

  constructor(@Optional() private dialogRef: MatDialogRef<EditCampaignComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public campaign: Campaign = {} as Campaign,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private campaignService: CampaignService,
              private balanceService: BalanceService) {
  }

  ngOnInit(): void {
    this.campaignEditForm = this.createCampaignForm();
  }

  createCampaignForm(): FormGroup {
    return this.fb.group({
      name: [
        this.campaign.name,
        Validators.compose([Validators.required])
      ],
      keywords: [
        this.campaign.keywords,
        Validators.compose([Validators.required])
      ],
      bid: [
        this.campaign.bid,
        Validators.compose([Validators.required])
      ],
      campaignFund: [
        this.campaign.campaignFund,
        Validators.compose([Validators.required])
      ],
      status: [
        this.campaign.status,
        Validators.compose([Validators.required])
      ],
      town: [
        this.campaign.town,
        Validators.compose([Validators.required])
      ],
      radius: [
        this.campaign.radius,
        Validators.compose([Validators.required])
      ],
    });
  }

  submit(): void {
    this.campaignService.updateCampaign(this.updateCampaign(), this.data.campaignId)
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.balanceService.changeBalance(this.campaignEditForm.value.campaignFund);
  }

  private updateCampaign(): Campaign {
    this.campaign.name = this.campaignEditForm.value.name;
    this.campaign.keywords = this.campaignEditForm.value.keywords;
    this.campaign.bid = this.campaignEditForm.value.bid;
    this.campaign.campaignFund = this.campaignEditForm.value.campaignFund;
    this.campaign.status = this.campaignEditForm.value.status;
    this.campaign.town = this.campaignEditForm.value.town;
    this.campaign.radius = this.campaignEditForm.value.radius;
    return this.campaign;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
