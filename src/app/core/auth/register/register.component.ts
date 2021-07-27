import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { catchError, exhaustMap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../style.auth.css']
})
export class RegisterComponent implements OnInit {

  clicks$: Subject<boolean> = new Subject();

  showPassword:boolean = false;

  name:string = environment.name;

  registerForm:FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.configRegisterForm();
    this.register();
  }

  getErrorTelefonoMessage() {
    if (this.registerForm.get('telefono').hasError('required')) {
      return 'El número de telefono es requerido';
    }

    return this.registerForm.get('telefono').hasError('minlength') ? 'El nombre es muy corto' : '';
  }

  getErrorNameMessage() {
    if (this.registerForm.get('name').hasError('required')) {
      return 'El nombre es requerido';
    }

    return this.registerForm.get('name').hasError('maxlength') ? 'El nombre es muy largo' : '';
  }

  getErrorPasswordMessage() {
    if (this.registerForm.get('password').hasError('required')) {
      return 'La contraseña es requerida.';
    }

    return this.registerForm.get('password').hasError('minlength') ? 'La contraseña es muy corta' : '';
  }

  getErrorEmailMessage() {
    if (this.registerForm.get('email').hasError('required')) {
      return 'El E-mail es requerido';
    }

    return this.registerForm.get('email').hasError('email') ? 'E-mail inválido' : '';
  }

  async submitRegister(){
    await this.ngxSpinnerService.show();
    if(this.registerForm.valid){
      this.clicks$.next(true);
    }else{
      await this.ngxSpinnerService.hide()
    }
  }

  register(){
    this.clicks$.pipe(
      exhaustMap(async ()=>{
        return await this.authService.register(this.registerForm.value)
      }),
      catchError((e)=>{
        this.registerForm.reset();
        this.register();
        return EMPTY;
      })
    ).subscribe();
  }

  configRegisterForm(){
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.max(40)]],
      email:['',[Validators.required,Validators.email]],
      telefono:['',[Validators.required,Validators.min(8)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

}
