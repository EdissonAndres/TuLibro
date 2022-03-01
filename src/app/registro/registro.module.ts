import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class RegistroModule { }
