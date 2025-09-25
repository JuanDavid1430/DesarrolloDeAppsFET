import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ErrorPoint, ErrorTrajectory, ErrorVisualizationData } from '../interfaces/error.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-simulacion-errores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulacion-errores.component.html',
  styleUrl: './simulacion-errores.component.css'
})
export class SimulacionErroresComponent implements OnInit, AfterViewInit {
  @ViewChild('trajectoryChart', { static: false }) trajectoryChartRef!: ElementRef;
  @ViewChild('errorEvolutionChart', { static: false }) evolutionChartRef!: ElementRef;
  @ViewChild('criticalPointsChart', { static: false }) criticalPointsChartRef!: ElementRef;

  private trajectoryChart!: Chart;
  private evolutionChart!: Chart;
  private criticalPointsChart!: Chart;

  errorData: ErrorVisualizationData = {
    trajectories: [],
    criticalPoints: [],
    relationships: []
  };

  // Datos quemados para simulación
  mockErrorData: ErrorPoint[] = [
    {
      id: 1,
      timestamp: new Date('2024-09-01T10:00:00'),
      severity: 'medium',
      errorType: 'NullPointerException',
      description: 'Variable no inicializada en componente',
      line: 45,
      file: 'user.component.ts',
      resolved: false,
      x: 1,
      y: 2
    },
    {
      id: 2,
      timestamp: new Date('2024-09-02T14:30:00'),
      severity: 'high',
      errorType: 'TypeError',
      description: 'Intento de acceso a propiedad undefined',
      line: 78,
      file: 'data.service.ts',
      resolved: false,
      x: 2,
      y: 4
    },
    {
      id: 3,
      timestamp: new Date('2024-09-03T09:15:00'),
      severity: 'critical',
      errorType: 'SecurityError',
      description: 'Vulnerabilidad XSS detectada',
      line: 123,
      file: 'sanitizer.service.ts',
      resolved: true,
      x: 3,
      y: 5
    },
    {
      id: 4,
      timestamp: new Date('2024-09-04T16:45:00'),
      severity: 'low',
      errorType: 'DeprecationWarning',
      description: 'Uso de método obsoleto',
      line: 200,
      file: 'legacy.component.ts',
      resolved: false,
      x: 4,
      y: 1
    },
    {
      id: 5,
      timestamp: new Date('2024-09-05T11:20:00'),
      severity: 'high',
      errorType: 'MemoryLeak',
      description: 'Suscripción sin unsubscribe',
      line: 89,
      file: 'subscription.component.ts',
      resolved: false,
      x: 5,
      y: 4
    },
    {
      id: 6,
      timestamp: new Date('2024-09-06T13:10:00'),
      severity: 'medium',
      errorType: 'ValidationError',
      description: 'Formulario inválido no manejado',
      line: 156,
      file: 'form.component.ts',
      resolved: true,
      x: 6,
      y: 3
    }
  ];

  ngOnInit() {
    this.initializeErrorData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createTrajectoryChart();
      this.createEvolutionChart();
      this.createCriticalPointsChart();
    }, 100);
  }

  private initializeErrorData() {
    // Crear trayectorias basadas en los errores mockeados
    this.errorData = {
      trajectories: [
        {
          errorId: 1,
          points: [this.mockErrorData[0], this.mockErrorData[1]],
          relationships: [2, 3]
        },
        {
          errorId: 2,
          points: [this.mockErrorData[1], this.mockErrorData[2]],
          relationships: [1, 4]
        }
      ],
      criticalPoints: this.mockErrorData.filter(error => error.severity === 'critical' || error.severity === 'high'),
      relationships: [
        { from: 1, to: 2, type: 'causes' },
        { from: 2, to: 3, type: 'related' },
        { from: 4, to: 5, type: 'blocks' }
      ]
    };
  }

  private createTrajectoryChart() {
    const ctx = this.trajectoryChartRef.nativeElement.getContext('2d');
    
    this.trajectoryChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Trayectoria de Errores',
          data: this.mockErrorData.map(error => ({
            x: error.x,
            y: error.y,
            errorInfo: error
          })),
          backgroundColor: this.mockErrorData.map(error => this.getColorBySeverity(error.severity)),
          borderColor: this.mockErrorData.map(error => this.getColorBySeverity(error.severity)),
          pointRadius: this.mockErrorData.map(error => this.getSizeByType(error.errorType)),
          pointHoverRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Trayectoria y Relaciones de Errores'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const error = context.raw.errorInfo;
                return [
                  `Tipo: ${error.errorType}`,
                  `Severidad: ${error.severity}`,
                  `Archivo: ${error.file}`,
                  `Línea: ${error.line}`,
                  `Estado: ${error.resolved ? 'Resuelto' : 'Pendiente'}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiempo (días)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Complejidad del Error'
            }
          }
        }
      }
    });
  }

  private createEvolutionChart() {
    const ctx = this.evolutionChartRef.nativeElement.getContext('2d');
    
    const evolutionData = this.mockErrorData.map((error, index) => ({
      x: index + 1,
      y: this.getSeverityValue(error.severity)
    }));

    this.evolutionChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Evolución de la Severidad',
          data: evolutionData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Evolución Temporal de Errores'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Secuencia de Errores'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nivel de Severidad'
            },
            min: 0,
            max: 5
          }
        }
      }
    });
  }

  private createCriticalPointsChart() {
    const ctx = this.criticalPointsChartRef.nativeElement.getContext('2d');
    
    const severityCount = this.mockErrorData.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.criticalPointsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(severityCount),
        datasets: [{
          data: Object.values(severityCount),
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffcd56',
            '#4bc0c0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Errores por Severidad'
          }
        }
      }
    });
  }

  private getColorBySeverity(severity: string): string {
    const colors = {
      low: '#4CAF50',
      medium: '#FFC107',
      high: '#FF9800',
      critical: '#F44336'
    };
    return colors[severity as keyof typeof colors] || '#9E9E9E';
  }

  private getSizeByType(errorType: string): number {
    const sizes = {
      'NullPointerException': 6,
      'TypeError': 8,
      'SecurityError': 12,
      'DeprecationWarning': 4,
      'MemoryLeak': 10,
      'ValidationError': 7
    };
    return sizes[errorType as keyof typeof sizes] || 6;
  }

  private getSeverityValue(severity: string): number {
    const values = {
      low: 1,
      medium: 2,
      high: 4,
      critical: 5
    };
    return values[severity as keyof typeof values] || 1;
  }

  // Métodos para interacción
  filterErrorsBySeverity(severity: string) {
    const filteredErrors = this.mockErrorData.filter(error => error.severity === severity);
    console.log(`Errores de severidad ${severity}:`, filteredErrors);
  }

  toggleErrorResolution(errorId: number) {
    const error = this.mockErrorData.find(e => e.id === errorId);
    if (error) {
      error.resolved = !error.resolved;
      // Actualizar gráficas
      this.updateCharts();
    }
  }

  private updateCharts() {
    if (this.trajectoryChart) {
      this.trajectoryChart.data.datasets[0].data = this.mockErrorData.map(error => ({
        x: error.x,
        y: error.y,
        errorInfo: error
      }));
      this.trajectoryChart.update();
    }
  }

  getErrorsByFile(): { [file: string]: ErrorPoint[] } {
    return this.mockErrorData.reduce((acc, error) => {
      if (!acc[error.file]) {
        acc[error.file] = [];
      }
      acc[error.file].push(error);
      return acc;
    }, {} as { [file: string]: ErrorPoint[] });
  }

  // Métodos auxiliares para el template
  getErrorCountBySeverity(severity: string): number {
    return this.mockErrorData.filter(e => e.severity === severity).length;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectValues(obj: any): any[] {
    return Object.values(obj);
  }

  getKeyValuePairs(obj: any): Array<{key: string, value: any}> {
    return Object.keys(obj).map(key => ({key, value: obj[key]}));
  }
}
