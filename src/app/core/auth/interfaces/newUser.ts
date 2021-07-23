import * as fb from 'firebase';
export interface NewUser{
  username:string,
  telefono:string,
  newUser:fb.default.auth.UserCredential
}
