import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionErroresComponent } from './simulacion-errores.component';

describe('SimulacionErroresComponent', () => {
  let component: SimulacionErroresComponent;
  let fixture: ComponentFixture<SimulacionErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulacionErroresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulacionErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
