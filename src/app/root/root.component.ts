import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UsersService } from '../core/services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  option = 0;
  user$: Observable<any> = this.usersService.af.user;
  correo!: any;

  constructor(
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

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogContentExampleDialog {}
