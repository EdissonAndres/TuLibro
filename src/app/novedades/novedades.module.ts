import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovedadesRoutingModule } from './novedades-routing.module';
import { NovedadesComponent } from './novedades.component';
import { SharedModule } from './../shared/shared.module';
import { UserComponent } from './user/user.component';
import { MaterialModule } from './../material/material.module';
import { PerfilComponent, DialogContentExampleDialog} from './user/perfil/perfil.component';
import { DatosComponent } from './user/perfil/datos/datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAgregarPago, PagosComponent } from './user/perfil/pagos/pagos.component';
import { ComprasComponent } from './user/perfil/compras/compras.component';
import { ReservasComponent } from './user/perfil/reservas/reservas.component';



@NgModule({
  declarations: [
    NovedadesComponent,
    UserComponent,
    PerfilComponent,
    DatosComponent,
    PagosComponent,
    ComprasComponent,
    ReservasComponent,
    DialogContentExampleDialog,
    DialogAgregarPago
  ],
  imports: [
    CommonModule,
    NovedadesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NovedadesModule { }
