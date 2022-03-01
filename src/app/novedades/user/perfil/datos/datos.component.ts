import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

import * as data from './../../../../../assets/countries.json';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {

  idFormControl = new FormControl();
  nombresFormControl = new FormControl();
  apellidosFormControl = new FormControl('', []);
  fechaNFormControl = new FormControl('', []);
  lugarNFormControl = new FormControl('', []);
  direccionFormControl = new FormControl('', []);
  generoFormControl = new FormControl('', []);
  usuarioFormControl = new FormControl('', []);
  correoFormControl = new FormControl('', []);
  preferenciasFormControl =  new FormControl('', []);

  form!: FormGroup;

  selectedValueLugarN = '';
  selectedValueGenero = '';

  preferencias: string[] = ['Novelas', 'Cuentos', 'Drama', 'Romance', 'Ficcion', 'Poesia', 'Erotico'];

  generos = [
    {value: 'Hombre', viewValue: 'Hombre'},
    {value: 'Mujer', viewValue: 'Mujer'},
    {value: 'Otro', viewValue: 'Otro'}
  ];

  paises: any = (data as any).default;

  minDate: Date;
  maxDate: Date;

  user$: Observable<any> = this.usersService.af.user;
  correo!: any;
  User!: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.buildForm();
    this.user$.subscribe(result => this.observabledata(result.email));
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 1, 1);
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDay);
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: this.idFormControl,
      nombres: this.nombresFormControl,
      apellidos: this.apellidosFormControl,
      fechaNacimiento: this.fechaNFormControl,
      lugarNacimiento: this.lugarNFormControl,
      direccion: this.direccionFormControl,
      genero: this.generoFormControl,
      usuario: this.usuarioFormControl,
      correo: this.correoFormControl,
      preferencias: this.preferenciasFormControl,
    });
  }

  updateForm(): void {
    const fecha = new Date(this.User?.fechaNacimiento);
    this.idFormControl = new FormControl(this.User?.id, [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')]);
    this.nombresFormControl = new FormControl(this.User?.nombres, [Validators.required, Validators.maxLength(25), Validators.pattern('([A-Za-z]|[A-Za-z]([A-Za-z]|\\s))+')]);
    this.apellidosFormControl = new FormControl(this.User?.apellidos, [Validators.required, Validators.maxLength(25), Validators.pattern('([A-Za-z]|[A-Za-z]([A-Za-z]|\\s))+')]);
    this.fechaNFormControl = new FormControl(fecha, [Validators.required]);
    this.lugarNFormControl = new FormControl(this.User?.lugarNacimiento, [Validators.required]);
    this.direccionFormControl = new FormControl(this.User?.direccion, [Validators.required, Validators.maxLength(100)]);
    this.generoFormControl = new FormControl(this.User?.genero, [Validators.required]);
    this.usuarioFormControl = new FormControl(this.User?.usuario, [Validators.required, Validators.maxLength(15), Validators.pattern('(\\S)+')]);
    this.correoFormControl = new FormControl(this.User?.correo, [Validators.required, Validators.email]);
    this.preferenciasFormControl =  new FormControl(this.User?.preferencias, [Validators.required]);
  }

  observabledata(datos: any): void {
    this.correo = datos;
    this.usersService.firebase.database.ref('/users').orderByChild('correo').equalTo(this.correo).on('child_added', (snapshot): any => {
      this.User = (snapshot.val());
      this.updateForm();
      this.buildForm();
    });
  }

  actualizarUsuario(): void {
    if (this.form.valid) {
      this.usersService.updateUser(this.User.id, this.form.value);
      alert('Los datos han sido actualizados');
    }
    else {
      alert('Los campos no son validos por favor asegurece de llenarlos correctamente');
    }
  }
}
