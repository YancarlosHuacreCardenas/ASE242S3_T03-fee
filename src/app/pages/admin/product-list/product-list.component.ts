import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product.model";

@Component({
  selector: "app-producto-lista",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductoListaComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  // 🔍 Filtros
  searchText: string = "";
  filterCategory: string = "";
  filterAvailable: string = "";

  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar los productos";
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search) ||
        (p.description ?? "").toLowerCase().includes(search);

      const matchesCategory =
        this.filterCategory === "" || p.category === this.filterCategory;

      const matchesAvailable =
        this.filterAvailable === "" ||
        String(p.is_available) === this.filterAvailable;

      return matchesSearch && matchesCategory && matchesAvailable;
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id || !confirm("¿Está seguro de que desea eliminar este producto?")) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        const product = this.products.find(p => p.product_id === id);
        if (product) product.is_available = false;
        this.applyFilters();
      },
      error: () => {
        this.error = "Error al eliminar el producto";
      },
    });
  }

  restoreProduct(id: number | undefined): void {
    if (!id) return;

    this.productService.restoreProduct(id).subscribe({
      next: (_) => {
        const product = this.products.find(p => p.product_id === id);
        if (product) product.is_available = true;
        this.applyFilters();
      },
      error: () => {
        this.error = "Error al restaurar el producto";
      },
    });
  }

  getCategoryLabel(category: string | undefined): string {
    const categories: { [key: string]: string } = {
      HAM: "Hamburguesas",
      PIZ: "Pizzas",
      ENS: "Ensaladas",
      BEB: "Bebidas",
      POS: "Postres",
    };
    return category ? categories[category] || category : "";
  }
}
