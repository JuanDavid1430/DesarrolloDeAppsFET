import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoHttpComponent } from './consumo-http.component';

describe('ConsumoHttpComponent', () => {
  let component: ConsumoHttpComponent;
  let fixture: ComponentFixture<ConsumoHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumoHttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumoHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
