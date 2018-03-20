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
  datos:any;
  saldoBTC:number;

  constructor(public navCtrl: NavController,public httpService:HttpconnectProvider) {
    this.exchanger=this.httpService.exchanger;
    this.nombre=this.httpService.nombre;
    this.trades=0;
    this.saldo=0;
    this.saldoBTC=0;
    setInterval(() => {      
      console.log('timer');
      this.datosbot();
      this.ionViewDidLoad();
      //you can call function here
},30000);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.exchanger=this.httpService.exchanger;
    this.nombre=this.httpService.nombre;
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=1";
    
    this.httpService.httpr(url).subscribe((data) => 
    {
      console.log(this.exchanger);
      
      console.log(data);
      console.log(data['success']);
      console.log(data['return']['funds']);
      this.saldo=data['return']['funds']['usd'];
      this.saldoBTC=data['return']['funds']['btc'];

      if (data['success']){
        this.msjapi="Verificada";
      }
      else{ this.msjapi="Hay problemas con las claves"}
      
    });
    this.datosbot();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.datosbot();
    setTimeout(() => {
      this.datosbot();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  datosbot()
  {
    console.log('Obteniendo Datos');
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
      return data;
    });

  }
  vender(i,id)
  {
    console.log(i);
    let myDate: string = new Date().toISOString();
    let fecha=encodeURI(myDate);

    let url='https://lycexpress.com/amelie/transaccion.php?opcion=4&cantidad='+this.pendientes[i].cantidad+'&precio='+this.pendientes[i].valor_moneda+'&fecha='+fecha+'&exchanger='+this.httpService.exchanger+'&moneda='+this.pendientes[i].moneda+'&id='+id+'&id_usuario='+this.httpService.id_usuario;
    
    console.log(url);

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
