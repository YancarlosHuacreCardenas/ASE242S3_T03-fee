import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableSpotService } from '../../services/table-spot.service';
import { TableSpot } from '../../models/table-spot.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  form: FormGroup;
  error: string = '';
  editing: boolean = false;
  tableId?: number;

  // Opciones para el menú desplegable
  statusOptions: string[] = ['Disponible', 'Ocupado', 'Reservado', 'Mantenimiento'];

  constructor(
    private fb: FormBuilder,
    private service: TableSpotService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      tableNumber: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      isAvailable: [true],
      notes: [''],
      status: ['Disponible'], // valor por defecto
      lastClean: [''],
      cleaningTime: [''],
      layoutDetails: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.tableId = +id;
        this.editing = true;
        this.loadMesa(this.tableId);
      }
    });
  }

  loadMesa(id: number): void {
    this.service.getById(id).subscribe({
      next: (data) => this.form.patchValue(data),
      error: () => this.error = 'Error al cargar los datos de la mesa'
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const table: TableSpot = this.form.value;

    if (this.editing && this.tableId) {
      this.service.update(this.tableId, table).subscribe({
        next: () => this.router.navigate(['/admin/table-lista']),
        error: () => this.error = 'Error al actualizar mesa'
      });
    } else {
      this.service.create(table).subscribe({
        next: () => this.router.navigate(['/admin/table-lista']),
        error: () => this.error = 'Error al agregar mesa'
      });
    }
  }
}
