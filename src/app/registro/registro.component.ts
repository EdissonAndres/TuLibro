import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './../core/services/users.service';

import * as data from './../../assets/countries.json';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  idFormControl = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')]);
  nombresFormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('([A-Za-z]|[A-Za-z]([A-Za-z]|\\s))+')]);
  apellidosFormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('([A-Za-z]|[A-Za-z]([A-Za-z]|\\s))+')]);
  fechaNFormControl = new FormControl('', [Validators.required]);
  lugarNFormControl = new FormControl('', [Validators.required]);
  direccionFormControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  generoFormControl = new FormControl('', [Validators.required]);
  usuarioFormControl = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('(\\S)+')]);
  correoFormControl = new FormControl('', [Validators.required, Validators.email]);
  contrasenFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$')]);
  confirmarContraFormControl =  new FormControl('', [Validators.required]);
  preferenciasFormControl =  new FormControl('', [Validators.required]);

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.buildForm();
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 1, 1);
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDay);
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  registrar() {
    if (this.form.valid) {
      if (this.contrasenFormControl.value === this.confirmarContraFormControl.value) {
        const value = this.form.value;
        this.usersService.createUser(value.correo, value.contrasena)
        .then(() => {
          this.usersService.addUser(value.id, value);
          alert('Registro exitoso Bienvenido a la comunidad de TU LIBRO');
          this.router.navigate(['/login']);
        })
        .catch(() => {
          alert('El correo ingresado ya se encuentra registrado');
        });
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      alert('Los campos no son validos por favor asegurece de llenarlos correctamente');
    }
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
      contrasena: this.contrasenFormControl,
      preferencias: this.preferenciasFormControl,
    });
  }
}
