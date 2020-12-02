import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoService } from '../services/photo.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

}
