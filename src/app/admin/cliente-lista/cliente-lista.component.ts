import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../models/customer.model";

@Component({
  selector: "app-cliente-lista",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./cliente-lista.component.html",
  styleUrls: ["./cliente-lista.component.css"],
})
export class ClienteListaComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Error al cargar clientes:", err);
        this.error = "Error al cargar los clientes";
        this.loading = false;
      },
    });
  }

  deleteCustomer(id: number | undefined): void {
    if (!id || !confirm("¿Está seguro de que desea eliminar este cliente?")) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter((c) => c.customerId !== id);
      },
      error: (err: any) => {
        console.error("Error al eliminar cliente:", err);
        this.error = "Error al eliminar el cliente";
      },
    });
  }

  getClientTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      A: "Premium",
      B: "Estándar",
      C: "Básico",
    };
    return types[type] || type;
  }
}
