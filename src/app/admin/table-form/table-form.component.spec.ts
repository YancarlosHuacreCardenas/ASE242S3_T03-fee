import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableFormComponent } from './table-form.component';
import { TableSpotService } from '../../services/table-spot.service';
import { of } from 'rxjs';

describe('TableFormComponent', () => {
  let component: TableFormComponent;
  let fixture: ComponentFixture<TableFormComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({})),
      update: jasmine.createSpy('update').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TableFormComponent],
      providers: [{ provide: TableSpotService, useValue: serviceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create on submit when adding', () => {
    component.editing = false;
    component.form.setValue({
      tableNumber: 1,
      location: 'Main Hall',
      capacity: 4,
      isAvailable: true,
      notes: '',
      status: 'Disponible',
      lastClean: '',
      cleaningTime: '',
      layoutDetails: ''
    });
    component.submit();
    expect(serviceMock.create).toHaveBeenCalled();
  });
});
