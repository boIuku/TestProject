import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../../service/campaign.service";
import {Router} from "@angular/router";
import {Campaign} from "../../models/Campaign";
import {map, Observable, startWith} from "rxjs";
import {BalanceService} from "../../service/balance.service";

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  campaignForm!: FormGroup;
  createdCampaign!: Campaign;
  options: string[] = ['Fashine', 'Sport', 'Health', 'Retire', 'Backyard', 'Chill'];
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;

  constructor(private campaignService: CampaignService,
              private balanceService: BalanceService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.campaignForm = this.createPostForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      );
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      keywords: ['', Validators.compose([Validators.required])],
      bid: ['', Validators.compose([Validators.required])],
      campaignFund: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      town: ['', Validators.compose([Validators.required])],
      radius: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {

    this.campaignService.createCampaign({
      name: this.campaignForm.value.name,
      keywords: this.campaignForm.value.keywords,
      bid: this.campaignForm.value.bid,
      campaignFund: this.campaignForm.value.campaignFund,
      status: this.campaignForm.value.status,
      town: this.campaignForm.value.town,
      radius: this.campaignForm.value.radius
    }).subscribe(data => {
      this.createdCampaign = data;
      console.log(data);
      this.router.navigate(['/profile']);
    });
    this.balanceService.changeBalance(this.campaignForm.value.campaignFund);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
