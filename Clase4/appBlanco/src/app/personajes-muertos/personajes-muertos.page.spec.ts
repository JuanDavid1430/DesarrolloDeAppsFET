import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajesMuertosPage } from './personajes-muertos.page';

describe('PersonajesMuertosPage', () => {
  let component: PersonajesMuertosPage;
  let fixture: ComponentFixture<PersonajesMuertosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajesMuertosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
