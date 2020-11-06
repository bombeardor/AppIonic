import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks : any[] = []    //array de ql tipo;
  constructor(private actionSheetCtrl : ActionSheetController, private alertCtrl : AlertController, private toastCtrl : ToastController) {

    let tasksJson = localStorage.getItem('taskDb');
  if (tasksJson != null) {
    this.tasks = JSON.parse(tasksJson);

  }

  }


  
  async openActions(task: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marca',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: ()=> {
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
   this.tasks  = this.tasks.filter(taskArray => task != taskArray);

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
          placeholder: 'Comprar pão'
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


async add(TaskList: string){
  console.log(TaskList);
 if(TaskList.trim().length < 1) {
   const toast = await this.toastCtrl.create({
    message: 'Informe o que deseja fazer!',
    duration: 2000,
    position: 'top'
   });
   toast.present();
   return;
   }
  
   let task = { name: `${TaskList}`, done: false};
   this.tasks.push(task);
   this.updateLocalStorage();
}
   

}


