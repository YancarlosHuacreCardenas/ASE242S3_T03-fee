import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { ProductoListaComponent } from "./product-list.component"

describe("ProductoLista", () => {
  let component: ProductoListaComponent
  let fixture: ComponentFixture<ProductoListaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoListaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductoListaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})