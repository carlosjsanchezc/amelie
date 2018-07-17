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
      this.ordenesa=data['abiertas'];
      this.ordenesr=data['resumen'];
      this.compras=data['compras'];
      this.ventas=data['ventas'];


      console.log("Ordenes manuales");
      console.log(this.ordenesnr);
      this.balance=data['balance'];
      this.balancerobot=data['balancerobot'];
      
      console.log('cerradas:');
      console.log(this.ordenesc);
      console.log('Resumen:xxxx');
      console.log(this.ordenesr);
      console.log('Balance');
      console.log(data['balance']);
      console.log("monedas");
      console.log(this.monedas);
      for (let index = 0; index < this.ordenesr.length; index++) {
        for (let k = 0; k < this.monedas.length; k++) {
          var s3:string;
          s3=this.ordenesr[index].moneda;

          var s=s3.indexOf(this.monedas[k].simbolo);


          if (s!=-1){

            this.ordenesr[index].imagen=this.monedas[k].imagen;
          }


          
        }
      }


      for (let index = 0; index < this.compras.length; index++) {
        for (let k = 0; k < this.monedas.length; k++) {
          var s3:string;
          s3=this.compras[index].moneda;

          var s=s3.indexOf(this.monedas[k].simbolo);


          if (s!=-1){

            this.compras[index].imagen=this.monedas[k].imagen;
          }


          
        }
      }


      for (let index = 0; index < this.ventas.length; index++) {
        for (let k = 0; k < this.monedas.length; k++) {
         
          s3=this.ventas[index].moneda;

          s=s3.indexOf(this.monedas[k].simbolo);


          if (s!=-1){

            this.ventas[index].imagen=this.monedas[k].imagen;
          }


          
        }
      }



      for (let index = 0; index < this.ordenesa.length; index++) {
        
        if (this.ordenesa[index].side=="sell") 
        {
          this.ordenesa[index].side="Venta";
        }
        if (this.ordenesa[index].side=="buy") 
        {
          this.ordenesa[index].side="Compra";
        }

        if (this.ordenesa[index].status=="closed") 
        {
          this.ordenesa[index].status="Cerrado";
        }
        if (this.ordenesa[index].status=="open") 
        {
          this.ordenesa[index].status="Abierta";
        }

      }
      this.ordenesc=data['cerradas'];
      console.log('Longitud:');
      console.log(this.ordenesc);
      for (let index = 0; index < this.ordenesc.length; index++) {
        
        if (this.ordenesc[index].side=="sell") 
        {
          this.ordenesc[index].side="Venta";
        }
        if (this.ordenesc[index].side=="buy") 
        {
          this.ordenesc[index].side="Compra";
        }

        if (this.ordenesc[index].status=="closed") 
        {
          this.ordenesc[index].status="Cerrado";
        }
        if (this.ordenesc[index].status=="open") 
        {
          this.ordenesc[index].status="Abierta";
        }

      }
      for (let index = 0; index < this.ordenesc.length; index++) 
      {

        if (this.ordenesc[index]=="Venta")
        {
          for (let k = 0; index < this.ordenesc.length; k++) 
          {
            if (this.ordenesc[k].side=="Compra")
            {
              if ((this.ordenesc[index].amount==this.ordenesc[k].amount)||(this.ordenesc[index].price==this.ordenesc[k].price))
              {
              
              }
            }
          }
        }

    
    
  
        
      }


      console.log('ordenes:');
      console.log(this.ordenesa);
    });


  }
}
