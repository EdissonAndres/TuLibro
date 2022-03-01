import { query } from '@angular/animations';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList!: AngularFireList<any>;
  selectedUser!: User;

  user$!: Observable<User>;


  constructor(
    public af: AngularFireAuth,
    public firebase: AngularFireDatabase
  ) {
    this.userList = firebase.list('/users');
  }

  async createUser(email: string, password: string): Promise<any> {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string): Promise<any> {
    this.firebase.database.ref('/users').orderByChild('correo').equalTo(email).on('child_added', (snapshot): any => {
      this.user$ = (snapshot.val());
    });
    return this.af.signInWithEmailAndPassword(email, password);
  }

  // tslint:disable-next-line: typedef
  async logout() {
      await this.af.signOut();
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
    return this.userList = this.firebase.list('/users');
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
      preferencias: user.preferencias,
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
      preferencias: user.preferencias,
    });
  }

  // tslint:disable-next-line: typedef
  deleteUser($id: string){
    this.userList.remove($id);
  }

}
