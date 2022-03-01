import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperarRoutingModule } from './recuperar-routing.module';
import { RecuperarComponent } from './recuperar.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecuperarComponent
  ],
  imports: [
    CommonModule,
    RecuperarRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecuperarModule { }
