import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './../core/services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};

  correoFormControl = new FormControl('', [Validators.required, Validators.email]);
  contrasenaFormControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  login() {
    if (this.form.valid) {
      const value = this.form.value;
      this.usersService.login(value.correo, value.contrasena)
      .then(() => {
        this.router.navigate(['/novedades/usuario']);
      })
      .catch(() => {
        alert('El correo o la contraseña no son correctos');
      });
    }
  }

  // tslint:disable-next-line: typedef
  private buildForm() {
    this.form = this.formBuilder.group({
      correo: this.correoFormControl,
      contrasena: this.contrasenaFormControl,
    });
  }

}
