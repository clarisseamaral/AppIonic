import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

interface Venda{
  cliente: string;
  descricao: string;
  valor:string;
  img:string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  vendas: any = [];

  groceries: any;

  constructor( private navCtrl: NavController, private storage: Storage) {

  }
  cadastrarVenda(){
    this.navCtrl.navigateForward('/cadastrar-venda');
  }
 
  listarVendas(){
      this.storage.get("vendas").then((val) => {
        this.vendas =  <Venda[]> JSON.parse(val);
      })
  }

  ionViewDidEnter() {
    this.listarVendas();
  }

}
