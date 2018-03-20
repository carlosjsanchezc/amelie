import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpconnectProvider } from '../../providers/httpconnect/httpconnect';
import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpService:HttpconnectProvider,private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('email')
  .then(
    data => {console.log(data);
    this.email=data},
    error => console.error(error)
  );

  this.nativeStorage.getItem('pwd')
  .then(
    data => {console.log(data);
    this.password=data},
    error => console.error(error)
  );
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
        this.nativeStorage.setItem('email', {property: this.email, anotherProperty:this.email})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  this.nativeStorage.setItem('pwd', {property: this.password, anotherProperty:this.password})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );


        this.navCtrl.setRoot(TabsPage);
      }
     
    });

  }

}
