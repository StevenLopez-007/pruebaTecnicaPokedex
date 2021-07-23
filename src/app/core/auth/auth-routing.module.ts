import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToDashboard = () => redirectLoggedInTo(['/pokedex']);
const routes: Routes = [
  {
    path:'login',
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectToDashboard,title:'Inicio de sesión'},
    component:LoginComponent
  },
  {
    path:'register',
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redirectToDashboard,title:'Creación de cuenta'},
    component:RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
