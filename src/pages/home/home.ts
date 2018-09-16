import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nombre:string;
  exchanger:string;
  id_exchanger:number;
  msjapi:string;
  pendientes:any[]=[];
  trades:number;
  saldo:number;
  spint:boolean;
  datos:any;
  last:number;
  saldoBTC:number;
  ntiempo:number;
  contratos:number;
  leverage:number;

  constructor(public navCtrl: NavController,public httpService:HttpconnectProvider,public alertCtrl: AlertController) {
    this.ntiempo=30000;
    this.contratos=0;
    this.leverage=10;
    this.exchanger=this.httpService.exchanger;
    this.id_exchanger=this.httpService.id_exchanger;
    if (this.id_exchanger==4)
    {
      console.log("BITMEX");
        this.ntiempo=30000;
    }
    this.nombre=this.httpService.nombre;
    this.trades=0;
    this.saldo=0;
    this.saldoBTC=0;
    setInterval(() => {      
      console.log('timer');
      this.datosbot();
      this.ionViewDidLoad();
      //you can call function here
},this.ntiempo);

  }




  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.exchanger=this.httpService.exchanger;
    this.id_exchanger=this.httpService.id_exchanger;
    console.log("Exchanger:");
    console.log(this.id_exchanger);
    this.nombre=this.httpService.nombre;
    let url="http://midasbottraders.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=1";
    
    this.httpService.httpr(url).subscribe((data) => 
    {
      if (data)
      {
        console.log(data);
        console.log(data['success']);
        console.log(data['return']['funds']);
        this.saldo=data['return']['funds']['usd'];
        this.saldoBTC=data['return']['funds']['btc'];
        this.last=data['return']['ticker'];


        if (data['success']){
          this.msjapi="Verificada";
        }
        else
        { 
          this.msjapi="Hay problemas con las claves"
        }
      }
    });
  
    this.datosbot();
  }

  logoff()
  {
    this.navCtrl.setRoot(LoginPage);
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
    let url="http://midasbottraders.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=2";
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

    let url='http://midasbottraders.com/amelie/transaccion.php?opcion=4&cantidad='+this.pendientes[i].cantidad+'&precio='+this.pendientes[i].valor_moneda+'&fecha='+fecha+'&exchanger='+this.httpService.exchanger+'&moneda='+this.pendientes[i].moneda+'&id='+id+'&id_usuario='+this.httpService.id_usuario;
    
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

  venderBITMEX(id:number)
  {

    let myDate: string = new Date().toISOString();
    let fecha=encodeURI(myDate);

    let url='http://midasbottraders.com/amelie/bitmextransaccion.php?opcion=5&id_usuario='+id.toString;
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
  showConfirmCompraBitmex() {
    const confirm = this.alertCtrl.create({
      title: 'Transaccion Bitmex',
      message: 'Está Usted Seguro de realizar la compra?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmVentaBitmex() {
    const confirm = this.alertCtrl.create({
      title: 'Transaccion Bitmex',
      message: 'Está Usted Seguro de cerrar transacción?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            console.log("Id Usuario:");
            console.log(this.httpService.id_usuario);
            this.venderBITMEX(this.httpService.id_usuario);
          }
        }
      ]
    });
    confirm.present();
  }


  confirmCerrarTransaccion(i,id) {
    const confirm = this.alertCtrl.create({
      title: 'Cerrar Transacción',
      message: 'Está Usted Seguro de cerrar transacción?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            console.log("Id Usuario:");
            console.log(this.httpService.id_usuario);
            if (this.httpService.id_exchanger==4)
            {
              this.venderBITMEX(this.httpService.id_usuario);

            }
            if (this.httpService.id_exchanger==2)
            {
              this.vender(i,id);

            }
            
          }
        }
      ]
    });
    confirm.present();
  }


}
