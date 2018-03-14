import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nombre:string;
  exchanger:string;
  msjapi:string;
  pendientes:any[]=[];
  trades:number;
  saldo:number;
  spint:boolean;

  constructor(public navCtrl: NavController,public httpService:HttpconnectProvider) {
    this.exchanger=this.httpService.exchanger;
    this.nombre=this.httpService.nombre;
    this.trades=0;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.exchanger=this.httpService.exchanger;
    this.nombre=this.httpService.nombre;
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario=1&opcion=1";
    
    this.httpService.httpr(url).subscribe((data) => 
    {
      console.log(data);
      console.log(data['success']);
      console.log(data['return']['funds']);
      this.saldo=data['return']['funds']['usd'];

      if (data['success']){
        this.msjapi="Verificada";
      }
      else{ this.msjapi="Hay problemas con las claves"}
      
    });
    this.datosbot();
  }
  datosbot()
  {
    this.exchanger=this.httpService.exchanger;
    this.nombre=this.httpService.nombre;
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=2";
    this.spint=true;
    this.httpService.httpr(url).subscribe((data) => 
    {
      console.log(data);
      this.pendientes=data['results'];
      this.trades=this.pendientes.length;
      this.spint=false;
    });
  }
}
