import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  userList!: AngularFireList<any>;

  constructor(
    public af: AngularFireAuth,
    public firebase: AngularFireDatabase
  ) {
    this.userList = firebase.list('/admins');
   }

   async createUser(email: string, password: string): Promise<any> {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  hasUser(): any {
    return this.af.authState;
  }

  emailReset(email: string): any {
  }

  passwordReset(email: string): any {
    return this.af.sendPasswordResetEmail(email);
  }

  // tslint:disable-next-line: typedef
  getUsers() {
    return this.userList = this.firebase.list('/admins');
  }

  // tslint:disable-next-line: typedef
  addUser(key: string, user: User) {
    this.userList.update(key, {
      key: user.id,
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      fechaNacimiento: String(user.fechaNacimiento),
      lugarNacimiento: user.lugarNacimiento,
      direccion: user.direccion,
      genero: user.genero,
      usuario: user.usuario,
      correo: user.correo,
    });
  }

  // tslint:disable-next-line: typedef
  updateUser(key: string, user: User){
    this.userList.update(key, {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      fechaNacimiento: String(user.fechaNacimiento),
      lugarNacimiento: user.lugarNacimiento,
      direccion: user.direccion,
      genero: user.genero,
      usuario: user.usuario,
      correo: user.correo,
    });
  }

  // tslint:disable-next-line: typedef
  deleteUser($id: string){
    this.userList.remove($id);
  }
}
