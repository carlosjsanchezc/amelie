import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  monedas:any[]=[];
  monedas_server:any[]=[];
  apikey:string;
  apisign:string;
  exchanger:string;
  constructor(public navCtrl: NavController,public HttpService:HttpconnectProvider) {
    this.cargarmonedas();
    this.apikey=this.HttpService.apikey;
    this.apisign=this.HttpService.apisign;
    this.exchanger=this.HttpService.exchanger;
  }
  cargarmonedas()
  {
    let id=this.HttpService.id_usuario;
    console.log("monedas:");
    console.log(id);
    let url="http://midasbottraders.com/amelie/monedas.php?id_usuario="+id;
    
    this.HttpService.httpr(url).subscribe((data) => 
    
    {
      console.log('Drata monedas');
      console.log(data);
      if (data['success']=='true')
      {
        this.monedas=data['coins'];
        console.log(this.monedas.length);
        for (let index = 0; index < this.monedas.length; index++) {
          this.monedas_server.push(false);
          
        }
        
        console.log(this.monedas);
      }

    });

  }
  salvar()
  {
    //this.monedas[i].estado=!this.monedas[i].estado;
    console.log(this.monedas);
    let m=JSON.stringify(this.monedas);
    let url="http://midasbottraders.com/amelie/monedas_usuario.php?monedas="+m+"&id_usuario="+this.HttpService.id_usuario;

    console.log(m);
    this.HttpService.httpr(url).subscribe((data) => 
    {
      console.log(data);
      if (data['success']=='true')
      {
        this.monedas=data['coins'];
        console.log(this.monedas.length);
        for (let index = 0; index < this.monedas.length; index++) {
          this.monedas_server.push("false");
          
        }
        
        
      }

    }); 
  }
}
