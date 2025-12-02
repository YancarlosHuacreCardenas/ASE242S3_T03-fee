import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  experiencias = [
    {
      titulo: 'Atardecer + Cócteles',
      descripcion: 'Disfruta de la vista panorámica con nuestros cócteles de autor al atardecer.',
      imagen: 'assets/experiencia1.jpg'
    },
    {
      titulo: 'Cena Gourmet en Terraza VIP',
      descripcion: 'Menú degustación con ingredientes premium en la zona VIP.',
      imagen: 'assets/experiencia2.jpg'
    },
    {
      titulo: 'Evento Privado Corporativo',
      descripcion: 'Espacio exclusivo para tu evento con servicio personalizado.',
      imagen: 'assets/experiencia3.jpg'
    }
  ];
}
