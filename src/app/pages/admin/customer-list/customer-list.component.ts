import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CustomerService } from "../../../services/customer.service";
import { Customer } from "../../../models/customer.model";

@Component({
  selector: "app-cliente-lista",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"],
})
export class ClienteListaComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  searchText = "";
  filterType = "";
  filterStatus = "";

  loading = false;
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;

    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar clientes";
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase();

    this.filteredCustomers = this.customers.filter((c) => {
      const matchesSearch =
        c.firstName.toLowerCase().includes(search) ||
        c.lastName.toLowerCase().includes(search) ||
        (c.email ?? "").toLowerCase().includes(search);

      const matchesType =
        this.filterType === "" || c.clientType === this.filterType;

      const matchesStatus =
        this.filterStatus === "" || String(c.isActive) === this.filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }

  deleteCustomer(id: number | undefined): void {
    if (!id || !confirm("¿Está seguro de eliminar este cliente?")) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        const found = this.customers.find(c => c.customerId === id);
        if (found) found.isActive = false;
        this.applyFilters();
      },
      error: () => {
        this.error = "Error al eliminar";
      },
    });
  }

  restoreCustomer(id: number | undefined): void {
    if (!id) return;

    this.customerService.restoreCustomer(id).subscribe({
      next: () => {
        const found = this.customers.find(c => c.customerId === id);
        if (found) found.isActive = true;
        this.applyFilters();
      }
    });
  }

  getClientTypeLabel(type: string): string {
    return { V: "VIP", R: "Regular", N: "Nuevo" }[type] || type;
  }
}
