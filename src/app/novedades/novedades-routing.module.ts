import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitanteGuard } from '../guards/visitante.guard';
import { UserGuard } from '../guards/user.guard';
import { NovedadesComponent } from './novedades.component';
import { UserComponent } from './user/user.component';
import { PerfilComponent } from './user/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [VisitanteGuard],
    component: NovedadesComponent
  },
  {
    path: 'usuario',
    canActivate: [UserGuard],
    component: UserComponent
  },
  {
    path: 'usuario/perfil',
    canActivate: [UserGuard],
    component: PerfilComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class NovedadesRoutingModule { }
