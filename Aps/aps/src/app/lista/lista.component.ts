import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [Camera
  ]
})
export class ListaComponent implements OnInit {
  tasks: any[] = []    //array de ql tipo;
  imagem21 = ""; //imagem
  constructor(private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
    private camera: Camera) {

    let tasksJson = localStorage.getItem('taskDb');
    if (tasksJson != null) {
      this.tasks = JSON.parse(tasksJson);

    }

  }


  //camera
  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let imagem21 = imageData;

    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }





  ngOnInit() { }



  async openActions(task: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marca',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;
          this.updateLocalStorage();
        }
      }

        , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel cklicked');
        }
      }]
    });
    await actionSheet.present();

  }

  delete(task: any) {
    this.tasks = this.tasks.filter(taskArray => task != taskArray);

    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }


  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'taskTaskList',
          type: 'text',
          placeholder: 'Anotação'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log(this.tasks);
            console.log('clicked cancel')
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form);
            this.add(form.taskTaskList);
          }
        }
      ]
    });
    await alert.present();
  }


  async add(TaskList: string) {
    console.log(TaskList);
    if (TaskList.trim().length < 1) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, prencha o campo corretamente',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    let task = { name: `${TaskList}`, done: false };
    this.tasks.push(task);
    this.updateLocalStorage();
  }


}
