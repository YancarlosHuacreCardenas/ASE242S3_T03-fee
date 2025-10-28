import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { TeamComponent } from '../../components/team/team.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { ReservasComponent } from '../../components/reservas/reservas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutUsComponent,
    TeamComponent,
    ContactFormComponent,
    ExperienceComponent,
    ReservasComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
