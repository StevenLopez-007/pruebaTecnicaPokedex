import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fb from 'firebase/app';

import { Router } from '@angular/router';

import { LoginForm } from './interfaces/loginForm';
import { NewUser } from './interfaces/newUser';
import { User } from './interfaces/user';
import { RegisterForm } from './interfaces/registerForm';

import { NgxSpinnerService } from 'ngx-spinner';

import { getMsgError } from './handle.error';

import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();

  providersID: string[] = ["google.com", "facebook.com"];

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private ngxSpinnerService: NgxSpinnerService,
    private angularFirestore: AngularFirestore) {

      // Observable que emite un valor cada vez que el estado de autenticacion del usuario cambia (concecta o se desconecta)
    this.angularFireAuth.authState.pipe(
      switchMap((userAuth) => {
        if (userAuth) {
          // Se obtiene el metodo de autenticacion usado
          const provider: string = userAuth.providerData[0].providerId;

          // Si no es por Google o Facebook, trae los datos de la base de datos
          if (!(this.providersID.includes(provider))) {
            return this.angularFirestore.collection('users').doc(userAuth.uid).valueChanges()
          } else {
            // Si no, se utiliza los datos que el metodo de autenticacion devuelve
            const user: User = {
              userName: userAuth.displayName,
              uid: userAuth.uid,
              email: userAuth.email,
              provider: provider
            }
            return of(user);
          }
        } else {
          return EMPTY;
        }
      })
    ).subscribe((userAuth: User) => {
      if (userAuth) {
        // Se pasa el usuairo autenticado al observavle user
        this.user.next(userAuth);
      }
    });
  }

  // Registro de un nuevo usuario
  async register(user: RegisterForm): Promise<void> {
    let userCredentials: fb.default.auth.UserCredential;
    try {
      await this.ngxSpinnerService.show();
      userCredentials = await this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password);

      const writeUser: NewUser = {
        username: user.name,
        telefono: user.password,
        newUser: userCredentials
      };

      // Guardar los datos del usuario en la base de datos
      await this.writeUserData(writeUser);
      this.router.navigate(['/login'])
      await this.ngxSpinnerService.hide();
    } catch (error: any) {
      await this.ngxSpinnerService.hide();
      // En caso de un error al guardar los datos en la base de datos, se eliminar el
      // usurio que se crea con el método "createUserWithEmailAndPassword()"
      await userCredentials.user.delete();
      // Eliminar el usuario del almacenamiento local
      await this.angularFireAuth.signOut();
      this.handleError(error.code);
      throw (error)
    }
  }


  // Autenticación con correo y contraseña
  async login(user: LoginForm): Promise<void> {
    try {
      await this.ngxSpinnerService.show();
      await this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password);
      await this.ngxSpinnerService.hide();
      this.router.navigate(['/pokedex'])
    } catch (error) {
      await this.ngxSpinnerService.hide();
      this.handleError(error.code);
      throw (error)
    }
  }

  async loginWithGoogle() {
    try {
      await this.ngxSpinnerService.show();
      await this.angularFireAuth.signInWithPopup(new fb.default.auth.GoogleAuthProvider());
      await this.ngxSpinnerService.hide();
      this.router.navigateByUrl('/pokedex');
    } catch (e) {
      this.handleError(e.code, null, 'Google');
      await this.ngxSpinnerService.hide();
    }
  }

  async loginWithFacebook() {
    try {
      await this.ngxSpinnerService.show();
      await this.angularFireAuth.signInWithPopup(new fb.default.auth.FacebookAuthProvider());
      await this.ngxSpinnerService.hide();
      this.router.navigateByUrl('/pokedex');
    } catch (e: any) {
      this.handleError(e.code, e.email, 'Facebook');
      await this.ngxSpinnerService.hide();
    }
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    this.user.next(null);
    this.router.navigateByUrl('/login')
  }

  getcurrentUser() {
    return this.angularFireAuth.currentUser;
  }

  handleError(code: string, args?: any, provider?: string) {
    const msg = getMsgError(code, args, provider);
    this.matSnackBar.open(msg, '', { duration: 3000 });
  }

  // Guardar usuario en base de datos
  writeUserData(user: NewUser):Promise<void> {
    const newUser = user.newUser.user;
    return this.angularFirestore.collection('users').doc(newUser.uid).set({
      uid: newUser.uid,
      userName: user.username,
      telefono: user.telefono,
      email: newUser.email
    });
  }

}
