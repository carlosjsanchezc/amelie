import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  id_usuario:number;
  id_exchanger:number;
  balancerobot:number;
  balance:number;
  ordenesa:any[]=[];
  ordenesc:any[]=[];
  ordenesr:any[]=[];
  ordenesnr:any[]=[];
  compras:any[]=[];
  ventas:any[]=[];
  
  
  monedas:any[]=[];
  monedas_server:any[]=[];
  constructor(public navCtrl: NavController,public httpService:HttpconnectProvider) {
this.cargahistorial();
this.cargarmonedas();
  }




  doRefresh(refresher) {
    
    this.cargahistorial();
  

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
    
  }

  cancelarorden(id)

  {
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=6&id_order="+id;
    this.httpService.httpr(url).subscribe((data) => 
    {
      console.log('Cancelando Orden');
      this.cargahistorial();
    });
  }

  cargarmonedas()
  {
    let id=this.httpService.id_usuario;
    console.log(id);
    let url="https://lycexpress.com/amelie/monedas.php?id_usuario="+id;
    
    this.httpService.httpr(url).subscribe((data) => 
    
    {
      console.log('Data monedas');
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

  cargahistorial()
  {
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=5";
    this.httpService.httpr(url).subscribe((data) => 
    {

      this.ordenesr=data['resumen'];



      console.log("Ordenes manuales");
      console.log(this.ordenesnr);
      this.balance=data['balance'];
      this.balancerobot=data['balancerobot'];
      

      




      
     
    
    
  
    });


  }
}
