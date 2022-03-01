import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  correoFormControl = new FormControl('', [Validators.required, Validators.email]);

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      correo: this.correoFormControl,
    });
  }

  passwordReset(): void{
    this.usersService.passwordReset(this.form.value.correo)
    .then(() => {
      alert('Correo enviado, revisa tu bandeja de entrada');
      this.router.navigate(['/login']);
    })
    .catch(() => {
      alert('Este correo no se encuentra registrado');
    });
  }

}
