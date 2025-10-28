import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasComponent } from './reservas.component'; // <- nombre y archivo corregido

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasComponent] // <- se usa declarations, no imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
