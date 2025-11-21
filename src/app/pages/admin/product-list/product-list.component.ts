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
  paginatedProducts: Product[] = [];

  loading = false;
  error: string | null = null;

  // 🔍 Buscador y filtros
  searchText: string = "";
  statusFilter: string = "all";        // all | active | inactive
  featuredFilter: string = "all";      // all | featured | not_featured

  // 📌 PAGINACIÓN
  currentPage = 1;
  pageSize = 7;
  totalPages = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // ======================
  //   CARGAR PRODUCTOS
  // ======================
  loadProducts(): void {
    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar productos";
        this.loading = false;
      },
    });
  }

  // ======================
  //   FILTROS Y BÚSQUEDA
  // ======================
  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product => {

      // 1️⃣ Filtro de búsqueda
      const nameMatch = (product.name || "").toLowerCase().includes(search);
      const descMatch = (product.description || "").toLowerCase().includes(search);
      const matchesSearch = search === "" ? true : (nameMatch || descMatch);

      // 2️⃣ Filtro Activos / Inactivos
      const matchesStatus =
        this.statusFilter === "all" ||
        (this.statusFilter === "active" && product.is_available === true) ||
        (this.statusFilter === "inactive" && product.is_available === false);

      // 3️⃣ Filtro Destacado (nuevo)
      const matchesFeatured =
        this.featuredFilter === "all" ||
        (this.featuredFilter === "featured" && product.is_featured === true) ||
        (this.featuredFilter === "not_featured" && product.is_featured === false);

      return matchesSearch && matchesStatus && matchesFeatured;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  // ======================
  //       PAGINACIÓN
  // ======================
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // ======================
  //  ELIMINAR / RESTAURAR
  // ======================
  deleteProduct(id: number | undefined): void {
    if (!id || !confirm("¿Eliminar producto?")) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        const p = this.products.find(p => p.product_id === id);
        if (p) p.is_available = false;

        this.applyFilters();
      },
      error: () => (this.error = "Error al eliminar"),
    });
  }

  restoreProduct(id: number | undefined): void {
    if (!id) return;

    this.productService.restoreProduct(id).subscribe({
      next: () => {
        const p = this.products.find(p => p.product_id === id);
        if (p) p.is_available = true;

        this.applyFilters();
      },
      error: () => (this.error = "Error al restaurar"),
    });
  }

  // ======================
  //      CATEGORÍAS
  // ======================
  getCategoryLabel(category: string | undefined): string {
    const categories: any = {
      HAM: "Hamburguesas",
      PIZ: "Pizzas",
      ENS: "Ensaladas",
      BEB: "Bebidas",
      POS: "Postres",
    };
    return category ? categories[category] || category : "";
  }
}
