import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { MaterialModule } from './../material/material.module';
import { BannerComponent } from './banner/banner.component';
import { HeaderRootComponent } from './header-root/header-root.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderUserComponent,
    BannerComponent,
    HeaderRootComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderUserComponent,
    BannerComponent,
    HeaderRootComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
