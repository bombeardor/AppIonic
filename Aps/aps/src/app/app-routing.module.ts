import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { ListaComponent } from './lista/lista.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  {
    path: '',
    component: TesteComponent,
    children: [
      {
        path: 'lista',
        component: ListaComponent,
      },
      {
        path: 'home',
        component: HomePage,
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
