import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { TarjetaService } from 'src/app/core/services/tarjeta.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YY',
  },
};

export interface DialogData {
  numero: string;
  tipo: string;
  fechaCaducidad: string;
  nombreTitular: string;
  ccTitular: string;
  cvv: string;
}

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  tarjetas!: any [];
  elemento!: any;
  datosTarjeta: any;

  user$: Observable<any> = this.usersService.af.user;
  correo!: any;
  User!: any;

  constructor(
    public dialog: MatDialog,
    private tarjetaService: TarjetaService,
    private usersService: UsersService
  ) {
    this.user$.subscribe(result => this.observabledata(result.email));
   }

  ngOnInit(): void {
  }

  observabledata(datos: any): void {
    this.correo = datos;
    this.usersService.firebase.database.ref('/users').orderByChild('correo').equalTo(this.correo).on('child_added', (snapshot): any => {
      this.User = (snapshot.val());
      this.tarjetaService.getTarjetas(this.User.key)
      .snapshotChanges()
      .subscribe(item => {
        this.tarjetas = [];
        item.forEach(element => {
          this.elemento = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          this.elemento['$id'] = element.key;
          this.tarjetas.push(this.elemento as never);
        });
      });
    });
  }

  modificarTarjeta(key: string): void {
    alert('Datos actualizados correctamente');

  }

  eliminarTarjeta(key: string): void {
    this.tarjetaService.deleteTarjeta(this.User.key, key);
    alert('La tarjeta ha sido eliminada correctamente');
  }

  agregarTarjeta(): void {
    const dialogRef = this.dialog.open(DialogAgregarPago, {
      width: '250px',
      data: {
        numero: this.datosTarjeta?.numero,
        tipo: this.datosTarjeta?.tipo,
        fechaCaducidad: this.datosTarjeta?.fechaCaducidad,
        nombreTitular: this.datosTarjeta?.nombreTitular,
        ccTitular: this.datosTarjeta?.ccTitular,
        cvv: this.datosTarjeta?.ccv,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.datosTarjeta = result;
      if (result !== undefined){
        this.tarjetaService.addTarjeta(this.User.key, this.datosTarjeta);
        alert('La tarjeta ha sido agregada correctamente');
      }
    });
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
// tslint:disable-next-line: component-class-suffix
export class DialogAgregarPago {

  form!: FormGroup;

  tipos = [
    {value: 'AmericanExpress', viewValue: 'AmericanExpress'},
    {value: 'MasterCard', viewValue: 'MasterCard'},
    {value: 'Visa', viewValue: 'Visa'}
  ];

  numeroFormControl = new FormControl('', [Validators.required, Validators.maxLength(18), Validators.pattern('[0-9]+')]);
  tipoFormControl = new FormControl('', [Validators.required]);
  fechaFormControl = new FormControl(moment(), [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('([A-Za-z]|[A-Za-z]([A-Za-z]|\\s))+')]);
  ccFormControl = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('[0-9]+')]);
  cvvFormControl = new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]+')]);

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarPago>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder) { this.buildForm(); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      numero: this.numeroFormControl,
      tipo: this.tipoFormControl,
      fechaCaducidad: this.fechaFormControl,
      nombreTitular: this.nombreFormControl,
      ccTitular: this.ccFormControl,
      cvv: this.cvvFormControl,
    });
  }

  // tslint:disable-next-line: typedef
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.fechaFormControl.value;
    ctrlValue.year(normalizedYear.year());
    this.fechaFormControl.setValue(ctrlValue);
  }

  // tslint:disable-next-line: typedef
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.fechaFormControl.value;
    ctrlValue.month(normalizedMonth.month());
    this.fechaFormControl.setValue(ctrlValue);
    datepicker.close();
  }

}
