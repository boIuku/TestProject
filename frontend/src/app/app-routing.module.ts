import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./layout/index/index.component";
import {ProfileComponent} from "./seller/profile/profile.component";
import {SellerCampaignsComponent} from "./seller/seller-campaigns/seller-campaigns.component";
import {AddCampaignComponent} from "./seller/add-campaign/add-campaign.component";

const routes: Routes = [
  {path: 'main', component: IndexComponent},
  {
    path: 'profile', component: ProfileComponent, children: [
      {path: 'add', component: AddCampaignComponent},
      {path: '', component: SellerCampaignsComponent}
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
