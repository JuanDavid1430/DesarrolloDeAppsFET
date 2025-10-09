import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { AnalisisVectorialService } from './analisis-vectorial.service';
import { VectorFlujo, EstadisticasVectoriales } from './modelos/vector-flujo.model';
import { ReporteError } from './modelos/reporte-error.model';

Chart.register(...registerables);

@Component({
  selector: 'app-simulacion-errores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulacion-errores.component.html',
  styleUrl: './simulacion-errores.component.css'
})
export class SimulacionErroresComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('vectorFieldChart') vectorFieldChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('magnitudChart') magnitudChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('estadoChart') estadoChartRef!: ElementRef<HTMLCanvasElement>;

  private vectorFieldChart?: Chart;
  private magnitudChart?: Chart;
  private estadoChart?: Chart;

  // Datos reactivos
  vectores: VectorFlujo[] = [];
  reportes: ReporteError[] = [];
  estadisticas: EstadisticasVectoriales = {
    magnitudPromedio: 0,
    desviacionEstandar: 0,
    vectoresConError: 0,
    vectoresConWarning: 0,
    vectoresOk: 0,
    cambiosBruscosDetectados: 0
  };

  private subscriptions: Subscription = new Subscription();

  constructor(private analisisVectorialService: AnalisisVectorialService) {}

  ngOnInit(): void {
    // Suscribirse a los observables del servicio
    this.subscriptions.add(
      this.analisisVectorialService.vectores$.subscribe(vectores => {
        this.vectores = vectores;
        this.actualizarGraficas();
      })
    );

    this.subscriptions.add(
      this.analisisVectorialService.reportes$.subscribe(reportes => {
        this.reportes = reportes;
      })
    );

    this.subscriptions.add(
      this.analisisVectorialService.estadisticas$.subscribe(estadisticas => {
        this.estadisticas = estadisticas;
      })
    );
  }

  ngAfterViewInit(): void {
    // Usar setTimeout para asegurar que el DOM está listo
    setTimeout(() => {
      this.inicializarGraficas();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destruirGraficas();
  }

  private inicializarGraficas(): void {
    if (this.vectorFieldChartRef && this.magnitudChartRef && this.estadoChartRef) {
      this.crearGraficaCampoVectorial();
      this.crearGraficaMagnitudes();
      this.crearGraficaEstados();
    }
  }

  private crearGraficaCampoVectorial(): void {
    const ctx = this.vectorFieldChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.vectorFieldChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Campo Vectorial de Flujo',
          data: this.vectores.map((v, index) => ({
            x: index,
            y: v.magnitud,
            vector: v
          })),
          backgroundColor: this.vectores.map(v => this.getColorByEstado(v.estado)),
          borderColor: this.vectores.map(v => this.getColorByEstado(v.estado)),
          pointRadius: 8,
          pointHoverRadius: 12
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Campo Vectorial - Representación del Flujo de Código',
            font: { size: 16, weight: 'bold' }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const vector = context.raw.vector as VectorFlujo;
                return [
                  `ID: ${vector.id}`,
                  `${vector.origen} → ${vector.destino}`,
                  `Magnitud: ${vector.magnitud.toFixed(2)}`,
                  `Dirección: ${vector.direccion}`,
                  `Estado: ${vector.estado.toUpperCase()}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Secuencia de Ejecución'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Magnitud (Complejidad)'
            },
            min: 0,
            max: 12
          }
        }
      }
    });
  }

  private crearGraficaMagnitudes(): void {
    const ctx = this.magnitudChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.magnitudChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.vectores.map(v => v.id),
        datasets: [{
          label: 'Magnitud del Vector',
          data: this.vectores.map(v => v.magnitud),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          fill: true,
          borderWidth: 2
        }, {
          label: 'Promedio',
          data: Array(this.vectores.length).fill(this.estadisticas.magnitudPromedio),
          borderColor: 'rgb(255, 99, 132)',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Análisis de Magnitudes - Detección de Anomalías',
            font: { size: 16, weight: 'bold' }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Magnitud'
            },
            min: 0
          }
        }
      }
    });
  }

  private crearGraficaEstados(): void {
    const ctx = this.estadoChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.estadoChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['OK', 'Warning', 'Error'],
        datasets: [{
          data: [
            this.estadisticas.vectoresOk,
            this.estadisticas.vectoresConWarning,
            this.estadisticas.vectoresConError
          ],
          backgroundColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Estados',
            font: { size: 16, weight: 'bold' }
          }
        }
      }
    });
  }

  private actualizarGraficas(): void {
    if (this.vectorFieldChart) {
      this.vectorFieldChart.data.datasets[0].data = this.vectores.map((v, index) => ({
        x: index,
        y: v.magnitud,
        vector: v
      }));
      this.vectorFieldChart.data.datasets[0].backgroundColor = this.vectores.map(v => this.getColorByEstado(v.estado));
      this.vectorFieldChart.data.datasets[0].borderColor = this.vectores.map(v => this.getColorByEstado(v.estado));
      this.vectorFieldChart.update('none');
    }

    if (this.magnitudChart) {
      this.magnitudChart.data.labels = this.vectores.map(v => v.id);
      this.magnitudChart.data.datasets[0].data = this.vectores.map(v => v.magnitud);
      this.magnitudChart.data.datasets[1].data = Array(this.vectores.length).fill(this.estadisticas.magnitudPromedio);
      this.magnitudChart.update('none');
    }

    if (this.estadoChart) {
      this.estadoChart.data.datasets[0].data = [
        this.estadisticas.vectoresOk,
        this.estadisticas.vectoresConWarning,
        this.estadisticas.vectoresConError
      ];
      this.estadoChart.update('none');
    }
  }

  private destruirGraficas(): void {
    if (this.vectorFieldChart) {
      this.vectorFieldChart.destroy();
    }
    if (this.magnitudChart) {
      this.magnitudChart.destroy();
    }
    if (this.estadoChart) {
      this.estadoChart.destroy();
    }
  }

  private getColorByEstado(estado: 'ok' | 'warning' | 'error'): string {
    const colores = {
      ok: 'rgb(75, 192, 192)',
      warning: 'rgb(255, 205, 86)',
      error: 'rgb(255, 99, 132)'
    };
    return colores[estado];
  }

  // Métodos públicos para interacción
  simularNuevoVector(): void {
    this.analisisVectorialService.simularNuevoVector();
  }

  limpiarReportes(): void {
    this.analisisVectorialService.limpiarReportes();
  }

  reiniciarAnalisis(): void {
    this.analisisVectorialService.reiniciarAnalisis();
  }

  getSeveridadClass(severidad: string): string {
    return `severidad-${severidad}`;
  }

  getTipoIcon(tipo: string): string {
    const iconos = {
      flujo: '🔄',
      magnitud: '📊',
      direccion: '➡️',
      sistema: '⚙️'
    };
    return iconos[tipo as keyof typeof iconos] || '⚠️';
  }

  getEstadoIcon(estado: string): string {
    const iconos = {
      ok: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return iconos[estado as keyof typeof iconos] || '❓';
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  trackByReporteId(index: number, reporte: ReporteError): string {
    return reporte.id;
  }

  trackByVectorId(index: number, vector: VectorFlujo): string {
    return vector.id;
  }

  exportarReportesATxt(): void {
    if (this.reportes.length === 0) {
      alert('No hay reportes para exportar');
      return;
    }

    // Generar contenido del archivo
    let contenido = '═══════════════════════════════════════════════════════════════\n';
    contenido += '    REPORTE DE ANÁLISIS VECTORIAL - DETECCIÓN DE ANOMALÍAS    \n';
    contenido += '═══════════════════════════════════════════════════════════════\n\n';
    contenido += `Fecha de generación: ${new Date().toLocaleString('es-ES')}\n`;
    contenido += `Total de reportes: ${this.reportes.length}\n\n`;
    
    // Estadísticas generales
    contenido += '─────────────────────────────────────────────────────────────\n';
    contenido += '                   ESTADÍSTICAS GENERALES                     \n';
    contenido += '─────────────────────────────────────────────────────────────\n';
    contenido += `Magnitud Promedio: ${this.estadisticas.magnitudPromedio.toFixed(2)}\n`;
    contenido += `Desviación Estándar: ${this.estadisticas.desviacionEstandar.toFixed(2)}\n`;
    contenido += `Vectores OK: ${this.estadisticas.vectoresOk}\n`;
    contenido += `Vectores Warning: ${this.estadisticas.vectoresConWarning}\n`;
    contenido += `Vectores Error: ${this.estadisticas.vectoresConError}\n`;
    contenido += `Cambios Bruscos Detectados: ${this.estadisticas.cambiosBruscosDetectados}\n\n`;

    // Agrupar reportes por severidad
    const reportesPorSeveridad = {
      critica: this.reportes.filter(r => r.severidad === 'critica'),
      alta: this.reportes.filter(r => r.severidad === 'alta'),
      media: this.reportes.filter(r => r.severidad === 'media'),
      baja: this.reportes.filter(r => r.severidad === 'baja')
    };

    // Imprimir reportes por severidad
    ['critica', 'alta', 'media', 'baja'].forEach(severidad => {
      const reportes = reportesPorSeveridad[severidad as keyof typeof reportesPorSeveridad];
      if (reportes.length > 0) {
        contenido += '═══════════════════════════════════════════════════════════════\n';
        contenido += `  REPORTES DE SEVERIDAD: ${severidad.toUpperCase()} (${reportes.length})  \n`;
        contenido += '═══════════════════════════════════════════════════════════════\n\n';

        reportes.forEach((reporte, index) => {
          contenido += `[${index + 1}] ─────────────────────────────────────────────────────\n`;
          contenido += `ID: ${reporte.id}\n`;
          contenido += `Tipo: ${reporte.tipo.toUpperCase()}\n`;
          contenido += `Severidad: ${reporte.severidad.toUpperCase()}\n`;
          contenido += `Fecha: ${this.formatearFecha(reporte.fecha)}\n`;
          contenido += `Descripción: ${reporte.descripcion}\n`;
          
          if (reporte.vectorRelacionado) {
            contenido += `\nVector Relacionado:\n`;
            contenido += `  - ID: ${reporte.vectorRelacionado.id}\n`;
            contenido += `  - Flujo: ${reporte.vectorRelacionado.origen} → ${reporte.vectorRelacionado.destino}\n`;
            contenido += `  - Magnitud: ${reporte.vectorRelacionado.magnitud.toFixed(2)}\n`;
            contenido += `  - Dirección: ${reporte.vectorRelacionado.direccion}\n`;
            contenido += `  - Estado: ${reporte.vectorRelacionado.estado.toUpperCase()}\n`;
          }
          contenido += '\n';
        });
      }
    });

    // Agregar vectores activos
    contenido += '═══════════════════════════════════════════════════════════════\n';
    contenido += `           VECTORES ACTIVOS EN EL SISTEMA (${this.vectores.length})           \n`;
    contenido += '═══════════════════════════════════════════════════════════════\n\n';
    
    this.vectores.forEach((vector, index) => {
      contenido += `[${index + 1}] ${vector.id} - ${vector.estado.toUpperCase()}\n`;
      contenido += `    Flujo: ${vector.origen} → ${vector.destino}\n`;
      contenido += `    Magnitud: ${vector.magnitud.toFixed(2)} | Dirección: ${vector.direccion}\n`;
      contenido += `    Timestamp: ${this.formatearFecha(vector.timestamp)}\n\n`;
    });

    // Pie de página
    contenido += '═══════════════════════════════════════════════════════════════\n';
    contenido += '           Sistema de Análisis Vectorial del Flujo              \n';
    contenido += '                    Angular 18 - Chart.js - RxJS                \n';
    contenido += '═══════════════════════════════════════════════════════════════\n';

    // Crear y descargar archivo
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fechaArchivo = new Date().toISOString().split('T')[0];
    const horaArchivo = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    link.download = `reporte_analisis_vectorial_${fechaArchivo}_${horaArchivo}.txt`;
    
    link.click();
    window.URL.revokeObjectURL(url);
    
    console.log('✅ Reporte exportado exitosamente');
  }

  exportarReportesJSON(): void {
    if (this.reportes.length === 0) {
      alert('No hay reportes para exportar');
      return;
    }

    const datosExportacion = {
      fechaGeneracion: new Date().toISOString(),
      estadisticas: this.estadisticas,
      reportes: this.reportes,
      vectores: this.vectores,
      metadata: {
        totalReportes: this.reportes.length,
        totalVectores: this.vectores.length,
        sistema: 'Análisis Vectorial del Flujo de Código',
        version: '1.0.0'
      }
    };

    const contenidoJSON = JSON.stringify(datosExportacion, null, 2);
    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    const fechaArchivo = new Date().toISOString().split('T')[0];
    const horaArchivo = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    link.download = `reporte_analisis_vectorial_${fechaArchivo}_${horaArchivo}.json`;
    
    link.click();
    window.URL.revokeObjectURL(url);
    
    console.log('✅ Reporte JSON exportado exitosamente');
  }
}
