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
  ordenesa:any[]=[];
  ordenesc:any[]=[];
  constructor(public navCtrl: NavController,public httpService:HttpconnectProvider) {
this.cargahistorial();
  }




  doRefresh(refresher) {
    
    this.cargahistorial();
    refresher.complete();

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

  cargahistorial()
  {
    let url="https://lycexpress.com/amelie/apiamelie.php?id_usuario="+this.httpService.id_usuario+"&opcion=5";
    this.httpService.httpr(url).subscribe((data) => 
    {
      this.ordenesa=data['abiertas'];
      console.log('Longitud:');
      console.log(this.ordenesa);
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
      console.log('ordenes:');
      console.log(this.ordenesa);
    });


  }
}
