import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

// ⚠️ Pantallas de autenticación (login y register)
import { LoginComponent } from './features/General/login/login.component';
import { RegisterComponent } from './features/General/register/register.component';

const routes: Routes = [
  // Rutas públicas (sin layout)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas (dentro del layout principal)
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'GestionProgramacion',
        loadChildren: () => import('./features/GestionProgramacion/programacion.module')
          .then(m => m.ProgramacionModule)
      },
      {
        path: 'GestionCompras',
        loadChildren: () => import('./features/GestionCompras/compras.module')
          .then(m => m.ComprasModule)
      },
      {
        path: 'GestionDistribucion',
        loadChildren: () => import('./features/GestionDistribucion/distribucion.module')
          .then(m => m.DistribucionModule)
      },
      {
        path: 'GestionAlmacenamiento',
        loadChildren: () => import('./features/GestionAlmacenamiento/almacenamiento.module')
          .then(m => m.AlmacenamientoModule)
      },
      
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]
  },

  // Cualquier ruta desconocida redirige al login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
