import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  tarjetasList!: AngularFireList<any>;
  selectedTarjeta!: any;

  tarjeta$!: Observable<any>;

  constructor(
    public firebase: AngularFireDatabase
  ) {
  }

  // tslint:disable-next-line: typedef
  getTarjetas(Cli: string) {
    return this.tarjetasList = this.firebase.list('/tarjetas/' + Cli);
  }

  // tslint:disable-next-line: typedef
  addTarjeta(Cli: string, tarjeta: any) {
    this.tarjetasList = this.firebase.list('/tarjetas/' + Cli);
    this.tarjetasList.update(tarjeta.numero, {
      cli: Cli,
      numero: tarjeta.numero,
      tipo: tarjeta.tipo,
      fechaCaducidad: tarjeta.fechaCaducidad.toLocaleString(),
      nombreTitular: tarjeta.nombreTitular,
      ccTitular: tarjeta.ccTitular,
      cvv: tarjeta.cvv,
    });
  }

  // tslint:disable-next-line: typedef
  updateUser(key: string, tarjeta: any){
    this.tarjetasList.update(key, {
      tipo: tarjeta.tipo,
      fechaCaducidad: String(tarjeta.fechaCaducidad),
      nombreTitular: tarjeta.nombreTitular,
      ccTitular: tarjeta.ccTitular,
      cvv: tarjeta.cvv,
    });
  }

  // tslint:disable-next-line: typedef
  deleteTarjeta(Cli: string, $id: string){
    this.tarjetasList = this.firebase.list('/tarjetas/' + Cli);
    this.tarjetasList.remove($id);
  }
}
