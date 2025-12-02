import { Routes } from '@angular/router';

// Componentes públicos
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TeamComponent } from './components/team/team.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ExperienceComponent } from './components/experience/experience.component';

// Panel de administración
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ClienteListaComponent } from './pages/admin/customer-list/customer-list.component';
import { ClienteFormComponent } from './pages/admin/customer-form/customer-form.component';
import { ProductoListaComponent } from './pages/admin/product-list/product-list.component';
import { ProductoFormComponent } from './pages/admin/product-form/product-form.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { ServicesPageComponent } from './components/services-page/services-page.component';

import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Página principal
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Páginas informativas
  { path: 'about-us', component: AboutUsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'experience', component: ExperienceComponent },
  { path: 'about-us-page', component: AboutUsPageComponent },
  { path: 'services-page', component: ServicesPageComponent },
  { path: 'reservar', loadComponent: () => import('./pages/reservation-form/reservation-form.component').then(m => m.ReservationFormComponent)},
  // Login tradicional (aunque tú usas el modal)
  { path: 'admin', component: LoginComponent },

  // Panel administrativo protegido
  {
    path: 'admin-panel',
    component: AdminComponent,
    canActivate: [AuthGuard],   // 🔐 PROTEGIDO
    children: [
      { path: 'cliente-lista', component: ClienteListaComponent, canActivate: [AuthGuard] },
      { path: 'cliente-form', component: ClienteFormComponent, canActivate: [AuthGuard] },
      { path: 'cliente-form/:id', component: ClienteFormComponent, canActivate: [AuthGuard] },

      { path: 'producto-lista', component: ProductoListaComponent, canActivate: [AuthGuard] },
      { path: 'producto-form', component: ProductoFormComponent, canActivate: [AuthGuard] },
      { path: 'producto-form/:id', component: ProductoFormComponent, canActivate: [AuthGuard] },

      { path: '', redirectTo: 'cliente-lista', pathMatch: 'full' },
    ],
  },

  // Redirección final
  { path: '**', redirectTo: '' },
];
