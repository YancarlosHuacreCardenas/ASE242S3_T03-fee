// src/app/pages/cliente-form/cliente-form.component.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../models/customer.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cliente-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./cliente-form.component.html",
  styleUrls: ["./cliente-form.component.css"],
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
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.customerId = +params["id"];
        this.isEditing = true;
        this.loadCustomer();
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.pattern(/^\d{3}-\d{4}$/)]],
      email: ["", [Validators.required, Validators.email]],
      clientType: ["A", Validators.required],
      isActive: [true],
    });
  }

  loadCustomer(): void {
    if (!this.customerId) return;
    this.loading = true;
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer: Customer) => {
        this.form.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          email: customer.email,
          clientType: customer.clientType,
          isActive: customer.isActive ?? true,
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Error al cargar cliente:", err);
        this.error = "Error al cargar el cliente";
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const customer: Customer = this.form.value;

    const request = this.isEditing && this.customerId
      ? this.customerService.updateCustomer(this.customerId, customer)
      : this.customerService.createCustomer(customer);

    request.subscribe({
      next: () => this.router.navigate(["/admin/cliente-lista"]),
      error: (err: any) => {
        console.error("Error al guardar cliente:", err);
        this.error = "Error al guardar el cliente";
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(["/admin/cliente-lista"]);
  }
}
