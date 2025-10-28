import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TableSpotService } from '../../services/table-spot.service';
import { TableSpot } from '../../models/table-spot.model';

@Component({
  selector: 'app-table-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table-lista.component.html',
  styleUrls: ['./table-lista.component.css']
})
export class TableListaComponent implements OnInit {
  mesas: TableSpot[] = [];
  error: string = '';

  constructor(private service: TableSpotService, private router: Router) {}

  ngOnInit(): void {
    this.loadMesas();
  }

  loadMesas(): void {
    this.service.getAll().subscribe({
      next: (data) => this.mesas = data,
      error: (err) => this.error = 'Error al cargar mesas'
    });
  }

  // ✅ Corregido: tableId puede ser undefined
  editarMesa(tableId?: number): void {
    if (tableId === undefined) return; // evita errores si no hay ID
    this.router.navigate(['/admin/table-form', tableId]);
  }

  nuevaMesa(): void {
    this.router.navigate(['/admin/table-form']);
  }
}
