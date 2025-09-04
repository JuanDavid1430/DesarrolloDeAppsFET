import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {
  elementos: string[] = [];
  nuevoElemento: string = '';
  elementoAEliminar: string = '';
  tituloOriginal = 'Manipulación del DOM';
  tituloActual = 'Manipulación del DOM';
  fondoOriginal = '';
  fondoActual = '';
  mostrarRestaurar = false;

  cambiarTexto() {
    this.tituloActual = 'He manipulado el texto';
    this.mostrarRestaurar = true;
  }

  cambiarFondo() {
    this.fondoActual = 'lightblue';
    this.mostrarRestaurar = true;
  }

  restaurar() {
    this.tituloActual = this.tituloOriginal;
    this.fondoActual = this.fondoOriginal;
    this.mostrarRestaurar = false;
  }

  agregarElemento() {
    if (this.nuevoElemento.trim() !== '') {
      this.elementos.push(this.nuevoElemento);
      this.nuevoElemento = '';
    } else {
      alert('Por favor, ingresa un texto válido.');
    }
  }

  eliminarElemento() {
    const indice = parseInt(this.elementoAEliminar);
    if (!isNaN(indice) && indice >= 0 && indice < this.elementos.length) {
      this.elementos.splice(indice, 1);
      this.elementoAEliminar = '';
    } else {
      alert('Por favor, ingresa un número válido.');
    }
  }
}
