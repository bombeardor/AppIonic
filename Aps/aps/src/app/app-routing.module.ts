import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { ListaComponent } from './lista/lista.component';
import { LoginPage } from './login/login.page';
import { TesteComponent } from './teste/teste.component';
import { CadastroPage } from './cadastro/cadastro.page';
import { FotosPage } from './fotos/fotos.page';

const routes: Routes = [
  {
    path: '',
    component: TesteComponent,
    children: [
      { path: 'lista', component: ListaComponent },
      { path: 'home', component: HomePage },
      { path: '', component: LoginPage },
      { path: 'cadastro', component: CadastroPage },
      { path: 'fotos', component: FotosPage },
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
