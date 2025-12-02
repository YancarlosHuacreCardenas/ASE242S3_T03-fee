import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent {
  backgroundImage = `linear-gradient(rgba(10,37,64,0.6), rgba(10,37,64,0.6)), url('assets/rooftop.jpg')`;
}