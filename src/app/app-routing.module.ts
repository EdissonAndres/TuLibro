import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VisitanteGuard } from './guards/visitante.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/novedades',
    pathMatch: 'full',
  },
  { path: 'novedades',
    loadChildren: () => import('./novedades/novedades.module').then(m => m.NovedadesModule),
  },
  {
    path: 'login',
    canActivate: [VisitanteGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registro',
    canActivate: [VisitanteGuard],
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)
  },
  { path: 'recuperar',
    canActivate: [VisitanteGuard],
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarModule)
  },
  { path: 'root',
    loadChildren: () => import('./root/root.module').then(m => m.RootModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
