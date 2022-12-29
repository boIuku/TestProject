import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Campaign} from "../models/Campaign";
import {Observable} from "rxjs";
import {BalanceService} from "./balance.service";

const CAMPAIGN_API = 'http://localhost:8080/api/campaign/';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient,
              private balanceService: BalanceService) {
  }

  createCampaign(campaign: Campaign): Observable<any> {
    return this.http.post(CAMPAIGN_API + 'create', campaign);
  }

  getAllCampaigns(): Observable<any> {
    return this.http.get(CAMPAIGN_API + 'all');
  }

  //Method for many users
  getCampaignForCurrentSeller(): Observable<any> {
    return this.http.get(CAMPAIGN_API + 'seller/campaigns');
  }

  updateCampaign(campaign: Campaign, campaignId: number): Observable<any> {
    return this.http.post(CAMPAIGN_API + campaignId + '/update', campaign);
  }

  deleteCampaign(id: number | undefined): Observable<any> {
    return this.http.post(CAMPAIGN_API + id + '/delete', null);
  }

}
