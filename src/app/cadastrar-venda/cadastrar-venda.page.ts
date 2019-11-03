import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

interface Venda {
   cliente : '';
   descricao : '';
   valor : '';
   img : string;
   //data : '';
}

@Component({
  selector: 'app-cadastrar-venda',
  templateUrl: './cadastrar-venda.page.html',
  styleUrls: ['./cadastrar-venda.page.scss'],
})
export class CadastrarVendaPage implements OnInit {

 venda: Venda;

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private camera: Camera){
     this.venda = {
       cliente: '',
       descricao: '',
       valor: '',
       img : "https://image.flaticon.com/icons/svg/1090/1090532.svg"
     };

  }

  ngOnInit() {
   
  }

  voltar(){
    this.navCtrl.navigateBack('/home');
  }
  
  cadastrar = () => {

    let vendasInseridas = [];

    this.storage.get("vendas").then((val) => {
        console.log('data is', val);
        
        if (val){
          vendasInseridas = JSON.parse(val);
        }

        let item = { cliente: this.venda.cliente, descricao: this.venda.descricao, valor: this.venda.valor, img: this.venda.img};
        vendasInseridas.push(item);
        this.storage.set("vendas" , JSON.stringify(vendasInseridas));
     })

    this.voltar();
  }

  abrirCamera () {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
    
      this.camera.getPicture(options).then((imageData) => {
        this.venda.img = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Lidar com erro
      });
    }
}
