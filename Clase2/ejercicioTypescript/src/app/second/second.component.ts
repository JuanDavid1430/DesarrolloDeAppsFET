import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  numero1: number = 0;
  numero2: number = 0;
  resultado: number | null = null;

  sumarNumeros() {
    this.resultado = this.numero1 + this.numero2;
  }
}
