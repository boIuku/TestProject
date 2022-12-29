import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const PRODUCT_API = 'http://localhost:8080/api/product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductsToCampaign(campaignId: number | undefined): Observable<any> {
    return this.http.get(PRODUCT_API + campaignId + '/all');
  }

  addProductToCampaign(campaignId: number, name: string): Observable<any> {
    return this.http.post(PRODUCT_API + campaignId + '/create', {
      name: name
    });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.post(PRODUCT_API + productId + '/delete', null);
  }

}
