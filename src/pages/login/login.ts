import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpService:HttpconnectProvider) {
    this.email="miguelhernandez";
    this.password="1234";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  validalogin()
  {
    let url="https://lycexpress.com/amelie/validarlogin.php?email="+this.email+"&password="+this.password;
    
    this.HttpService.httpr(url).subscribe((data) => 
    {
      console.log(data);
      if (data['success']=='true')
      {
        console.log('Login true');
        this.HttpService.exchanger=data['exchanger'];
        this.HttpService.nombre=data['nombre'];
        this.HttpService.apikey=data['apikey'];
        this.HttpService.apisign=data['apisign'];
        this.HttpService.id_usuario=data['id'];
        
        this.navCtrl.setRoot(TabsPage);
      }

    });

  }

}
