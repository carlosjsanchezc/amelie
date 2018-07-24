import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
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
  mimensaje:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpService:HttpconnectProvider,private storage: Storage) {
    storage.get('email').then((val) => {
      console.log('Your email is:', val);
      this.email=val;
    });

    storage.get('pwd').then((val) => {
      console.log('Your password is:', val);
      this.password=val;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  validalogin()
  {
    let url="https://midasbottraders.com/amelie/validarlogin.php?email="+this.email+"&password="+this.password;
    
    this.HttpService.httpr(url).subscribe((data) => 
    {
      console.log(data);
      if (data['success']=='true')
      {
        this.mimensaje="Entrando...";
        console.log('Login true');
        this.HttpService.exchanger=data['exchanger'];
        this.HttpService.nombre=data['nombre'];
        this.HttpService.apikey=data['apikey'];
        this.HttpService.apisign=data['apisign'];
        this.HttpService.id_usuario=data['id'];
        this.storage.set('email',this.email);
        this.storage.set('pwd', this.password);



        this.navCtrl.setRoot(TabsPage);
      }
      else
      {
        this.mimensaje="Clave o usuario inválido";
      }
     
    });

  }

}
