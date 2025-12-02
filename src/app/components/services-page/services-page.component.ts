import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../../layouts/header/header.component';
import { FooterComponent } from './../../layouts/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent {}
