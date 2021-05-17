import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankInfo } from './models/bankInfo';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor( private httpClient: HttpClient ) { }
  public validateAccount(validateAccount: BankInfo): Observable<any> {
    return this.httpClient.post('this.apis.verifyAccount', validateAccount)
  }
}
