import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  luz = '';
  temperatura = '';

  constructor(public navCtrl: NavController, public http: Http) {
  
    this.leDados();

  }

  public leDados(){
    this.http.get('http://192.168.0.106:8012/leSensorLuz').map(res => res.json()).subscribe(data => {
        this.luz = data;
    });

    this.http.get('http://192.168.0.106:8012/temperatura').map(res => res.json()).subscribe(data => {
        this.temperatura = data;
    });
  }

  switch(ligar: boolean){
    if (ligar){
      this.http.get('http://192.168.0.106:8012/rele/?ligado=true').map(res => res.json()).subscribe(data => {
          
      });
    } else {
      this.http.get('http://192.168.0.106:8012/rele/?ligado=false').map(res => res.json()).subscribe(data => {
          
      });
    }
  }

}
