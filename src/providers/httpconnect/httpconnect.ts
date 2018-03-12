
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
  apikey:string;
  apisign:string;
  constructor(public http: HttpClient) {
    console.log('Hello HttpconnectProvider Provider');
    this.id_usuario=1;
    console.log(this.id_usuario);
  }
  httpr(url) {

    return this.http.get(url);
  }
}
