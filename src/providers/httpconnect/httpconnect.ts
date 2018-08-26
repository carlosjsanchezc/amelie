
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*
  Generated class for the HttpconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpconnectProvider {
  nombre:string;
  id_usuario:number;
  exchanger:string;
  id_exchanger:number;
  apikey:string;
  apisign:string;
  constructor(public http: HttpClient) {
      }
  httpr(url) {

    return this.http.get(url);
  }
}
