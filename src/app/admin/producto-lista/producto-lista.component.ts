import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ProductService } from "../../services/product.service"
import { Product } from "../../models/product.model"

@Component({
  selector: "app-producto-lista",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./producto-lista.component.html",
  styleUrls: ["./producto-lista.component.css"],
})
export class ProductoListaComponent implements OnInit {
  products: Product[] = []
  loading = false
  error: string | null = null

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.loading = true
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data
        this.loading = false
      },
      error: () => {
        this.error = "Error al cargar los productos"
        this.loading = false
      },
    })
  }

  deleteProduct(id: number | undefined): void {
    if (!id || !confirm("¿Está seguro de que desea eliminar este producto?")) return

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.product_id !== id)
      },
      error: () => {
        this.error = "Error al eliminar el producto"
      },
    })
  }

  getCategoryLabel(category: string): string {
    const categories: { [key: string]: string } = {
      HAM: "Hamburguesas",
      PIZ: "Pizzas",
      ENS: "Ensaladas",
      BEB: "Bebidas",
      POS: "Postres",
    }
    return categories[category] || category
  }
}
