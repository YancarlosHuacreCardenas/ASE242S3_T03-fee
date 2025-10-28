import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  nombre = '';
  email = '';
  mensaje = '';

  enviarFormulario() {
    if (this.nombre && this.email && this.mensaje) {
      alert(`Gracias ${this.nombre}, hemos recibido tu mensaje.`);
      this.nombre = '';
      this.email = '';
      this.mensaje = '';
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
