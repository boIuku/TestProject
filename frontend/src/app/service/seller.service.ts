import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const SELLER_API = 'http://localhost:8080/api/seller/';
const TMP_SELLER_ID = 1;

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) {
  }

  getSellerById(id: number): Observable<any> {
    return this.http.get(SELLER_API + id);
  }

  //Only one seller available
  getCurrentSeller(): Observable<any> {
    return this.http.get(SELLER_API);
  }

  createSeller(seller: any): Observable<any> {
    return this.http.post(SELLER_API + 'create', seller);
  }

  updateSeller(seller: any): Observable<any> {
    return this.http.post(SELLER_API + TMP_SELLER_ID + '/update', seller);
  }

}
