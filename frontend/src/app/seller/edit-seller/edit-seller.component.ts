import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SellerService} from "../../service/seller.service";
import {Seller} from "../../models/Seller";

@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.css']
})
export class EditSellerComponent implements OnInit {

  public profileEditForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditSellerComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public seller: Seller = {} as Seller,
              private sellerService: SellerService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      name: [
        this.seller.name,
        Validators.compose([Validators.required])
      ],
      surname: [
        this.seller.surname,
        Validators.compose([Validators.required])
      ],
      emeraldFund: [
        this.seller.emeraldFund,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.sellerService.updateSeller(this.updateSeller())
      .subscribe(() => {
        this.dialogRef.close();
        this.reloadPage();
      });
  }

  private updateSeller(): Seller {
    this.seller.name = this.profileEditForm.value.name;
    this.seller.surname = this.profileEditForm.value.surname;
    this.seller.emeraldFund = this.profileEditForm.value.emeraldFund;
    return this.seller;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  reloadPage() {
    window.location.reload()
  }
}

