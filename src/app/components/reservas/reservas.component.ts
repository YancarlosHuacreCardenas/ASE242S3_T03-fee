import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  mesasDisponibles: any[] = [];
  reserva = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    fecha: '',
    hora: '',
    guests: 1,
    mesa: ''
  };
  mensaje = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/mesas-disponibles')
      .subscribe({
        next: data => this.mesasDisponibles = data,
        error: err => console.error('Error cargando mesas', err)
      });
  }

  crearReserva() {
    this.http.post('http://localhost:5000/api/reservas', this.reserva)
      .subscribe({
        next: () => this.mensaje = '✅ ¡Reserva registrada con éxito!',
        error: () => this.mensaje = '❌ Error al crear la reserva'
      });
  }
}
