import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {

  imagem21: any = null;

  constructor(private camera: Camera) { }

  //camera
  tirarFoto() {
    console.log('kkkkkk')
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let imagem = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Erro na captura: " + err);
    });
  }





  ngOnInit() {
  }

}
