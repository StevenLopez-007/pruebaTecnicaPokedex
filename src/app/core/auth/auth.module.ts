import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { AngularMaterialModule } from '../../angular-material.module';

@NgModule({
  declarations: [LoginComponent,RegisterComponent,AuthTemplateComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:[LoginComponent,RegisterComponent]
})
export class AuthModule { }
