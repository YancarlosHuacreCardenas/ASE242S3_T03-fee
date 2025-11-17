import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../../../services/customer.service";
import { Customer } from "../../../models/customer.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cliente-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"],
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isEditing = false;
  customerId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.customerId = +params["id"];
        this.isEditing = true;
        this.loadCustomer();
      }
    });
  }

  // ✅ Inicialización del formulario
  private initForm(): void {
    this.form = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ["", [Validators.required, Validators.email]],
      preferences: [""],
      clientType: ["N", Validators.required],
      isActive: [true], // 👈 Campo de cliente activo
      registeredAt: [""],
      updatedAt: [""],
    });
  }

  // ✅ Cargar cliente existente
  private loadCustomer(): void {
    if (!this.customerId) return;
    this.loading = true;

    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer: Customer) => {
        this.form.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          email: customer.email,
          preferences: customer.preferences,
          clientType: customer.clientType ?? "N",
          isActive: customer.isActive ?? true,
          registeredAt: customer.registeredAt,
          updatedAt: customer.updatedAt,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error al cargar cliente:", err);
        this.error = "Error al cargar el cliente.";
        this.loading = false;
      },
    });
  }

  // ✅ Guardar o actualizar cliente
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const customer: Customer = this.form.value;

    // Aseguramos que `isActive` sea booleano
    customer.isActive = !!customer.isActive;

    const request = this.isEditing && this.customerId
      ? this.customerService.updateCustomer(this.customerId, customer)
      : this.customerService.createCustomer(customer);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/admin/cliente-lista"]);
      },
      error: (err) => {
        console.error("❌ Error al guardar cliente:", err);
        this.error = "Error al guardar el cliente.";
        this.loading = false;
      },
    });
  }

  // ✅ Cancelar acción
  onCancel(): void {
    this.router.navigate(["/admin/cliente-lista"]);
  }
}
