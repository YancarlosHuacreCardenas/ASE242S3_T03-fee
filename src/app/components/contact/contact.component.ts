import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private router: Router, private location: Location) {}

  sendMessage() {
    // Aquí podrías procesar el form real (HTTP), por ahora solo alerta y retrocede al home
    alert("Mensaje enviado. ¡Gracias por contactarte con Altavista Rooftop!");
    // Después de enviar redirigimos al home
    this.router.navigate(['/']);
  }

  goBack() {
    // Si hay historial navegable, retrocede; si no, redirige al home como fallback.
    // window.history.length suele ser >1 si venimos desde otra página dentro de la app
    if (window.history.length > 1) {
      // Preferimos Location.back() porque integra con Angular LocationStrategy
      this.location.back();
    } else {
      // Fallback: no hay historial -> ir al inicio
      this.router.navigate(['/']);
    }
  }
}
