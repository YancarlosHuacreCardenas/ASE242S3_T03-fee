import { Routes } from '@angular/router';

// Componentes públicos
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TeamComponent } from './components/team/team.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ReservasComponent } from './components/reservas/reservas.component';

// Panel de administración
import { AdminComponent } from './admin/admin.component';
import { ClienteListaComponent } from './admin/cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './admin/cliente-form/cliente-form.component';
import { ProductoListaComponent } from './admin/producto-lista/producto-lista.component';
import { ProductoFormComponent } from './admin/producto-form/producto-form.component';
import { TableFormComponent } from './admin/table-form/table-form.component';
import { TableListaComponent } from './admin/table-lista/table-lista.component';

export const routes: Routes = [
  // Página principal
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Páginas informativas
  { path: 'about-us', component: AboutUsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'experience', component: ExperienceComponent },

  // Panel de administración
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      // Clientes
      { path: 'cliente-lista', component: ClienteListaComponent },
      { path: 'cliente-form', component: ClienteFormComponent },
      { path: 'cliente-form/:id', component: ClienteFormComponent },

      // Productos
      { path: 'producto-lista', component: ProductoListaComponent },
      { path: 'producto-form', component: ProductoFormComponent },
      { path: 'producto-form/:id', component: ProductoFormComponent },

      // Mesas
      { path: 'table-lista', component: TableListaComponent },       // Lista de mesas
      { path: 'table-form', component: TableFormComponent },         // Agregar mesa
      { path: 'table-form/:id', component: TableFormComponent },     // Editar mesa

      // Redirección por defecto dentro del admin
      { path: '', redirectTo: 'cliente-lista', pathMatch: 'full' },
    ],
  },

  // Página no encontrada → redirige al inicio
  { path: '**', redirectTo: '' },
];
