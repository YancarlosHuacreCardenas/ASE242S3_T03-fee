import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../../layouts/header/header.component';
import { FooterComponent } from './../../layouts/footer/footer.component';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent {}
