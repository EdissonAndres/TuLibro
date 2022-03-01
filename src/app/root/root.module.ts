import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import { DialogContentExampleDialog, RootComponent } from './root.component';
import { SharedModule } from './../shared/shared.module';

import { MaterialModule } from './../material/material.module';
import { AdminsComponent } from './admins/admins.component';


@NgModule({
  declarations: [
    RootComponent,
    DialogContentExampleDialog,
    AdminsComponent
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class RootModule { }
