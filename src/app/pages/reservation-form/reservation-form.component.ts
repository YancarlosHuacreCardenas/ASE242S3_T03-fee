import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ReservationFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  error: string | null = null;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      preferences: [''],

      reservationDate: ['', Validators.required],
      reservationTime: ['', Validators.required],
      guestsCount: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const customer = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      email: this.form.value.email,
      preferences: this.form.value.preferences?.trim() || "{}",
      clientType: "N",
      isActive: true
    };

    this.customerService.createCustomer(customer).subscribe({
      next: (newCustomer: any) => {

        const reservation = {
          reservationDate: this.form.value.reservationDate,
          reservationTime: this.form.value.reservationTime,
          guestsCount: this.form.value.guestsCount,
          notes: this.form.value.notes,
          status: "Pendiente",
          customer: { customerId: newCustomer.customerId },
          tableSpot: { tableId: 1 } // temporal
        };

        this.reservationService.createReservation(reservation).subscribe({
          next: () => {
            this.loading = false;
            this.success = true;

            setTimeout(() => {
              this.router.navigate(['/reservas-lista']);
            }, 2500);
          },
          error: () => {
            this.error = "Error al registrar la reserva.";
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = "Error al registrar el cliente.";
        this.loading = false;
      }
    });
  }
}
