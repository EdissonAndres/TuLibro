import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  option = 0;
  user$: Observable<any> = this.usersService.af.user;
  correo!: any;

  constructor(
    private router: Router,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {
    this.user$.subscribe(result => this.observabledata(result.email));
  }

  ngOnInit(): void {
  }

  observabledata(datos: any): void {
    this.correo = datos;
  }

  cambiarContrasena(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.usersService.passwordReset(this.correo);
          alert('Correo enviado, revisa tu bandeja de entrada');
        } catch {
          alert('Ha ocurrido un error, intente de mas tarde');
        }
      }
    });
  }

  eliminarCuenta(): void {

  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContentExampleDialog {}
