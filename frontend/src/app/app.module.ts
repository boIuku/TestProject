import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './layout/navigation/navigation.component';
import {IndexComponent} from './layout/index/index.component';
import {AddCampaignComponent} from './seller/add-campaign/add-campaign.component';
import {EditSellerComponent} from './seller/edit-seller/edit-seller.component';
import {SellerCampaignsComponent} from './seller/seller-campaigns/seller-campaigns.component';
import {ProfileComponent} from './seller/profile/profile.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EditCampaignComponent} from './seller/edit-campaign/edit-campaign.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {BalanceService} from "./service/balance.service";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IndexComponent,
    AddCampaignComponent,
    EditSellerComponent,
    SellerCampaignsComponent,
    ProfileComponent,
    EditCampaignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: 'edit-campaign-component',
      useValue: EditCampaignComponent,
    },
    {provide: MatDialogRef, useValue: {}},

    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: BalanceService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
