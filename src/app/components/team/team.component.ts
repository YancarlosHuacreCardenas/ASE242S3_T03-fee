import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  integrantes = [
    {
      nombre: 'Nayeli Herrera Albino',
      cargo: 'Desarrolladora Web Frontend',
      foto: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80'
    },
    {
      nombre: 'Yancarlos Huacre Cárdenas',
      cargo: 'Desarrollador Backend y Base de Datos',
      foto: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80'
    }
  ];
}
