import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Diagramas } from './objects/Diagramas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nombre: string = 'A';
  rafagas: number = 0;
  tiempoDeLLegada: number = 0;
  tiempoPromedio: number = 0;
  prioridad: number = 0;
  diagrama: Diagramas[] = [];
  tipoDeAlgoritmo: string = 'FCFS';


  //Create new Diagramas without prioridad
  createDiagramas() {
    if ((!this.validateName()) && (this.validateRafagas()) && (this.validateTiempoDeLlegada())) {
      this.rafagas = Math.trunc(this.rafagas);
      this.tiempoDeLLegada = Math.trunc(this.tiempoDeLLegada);
      let diagrama: Diagramas = new Diagramas(this.nombre, this.rafagas, this.tiempoDeLLegada, 0, 0, 0, 1);
      this.diagrama.push(diagrama);
    } else {
      alert('El proceso no fue creado. (Revisa si tienes un error en el nombre)');
    }
    this.nombre = 'A';
    this.rafagas = 0;
    this.tiempoDeLLegada = 0;
  }

  //Create new Diagramas
  createDiagramasPRIORIDAD() {
    if ((!this.validateName()) && (this.validateRafagas()) && (this.validateTiempoDeLlegada() && (this.validatePrioridad()))) {
      this.rafagas = Math.trunc(this.rafagas);
      this.tiempoDeLLegada = Math.trunc(this.tiempoDeLLegada);
      this.prioridad = Math.trunc(this.prioridad);
      let diagrama: Diagramas = new Diagramas(this.nombre, this.rafagas, this.tiempoDeLLegada, 0, 0, 0, this.prioridad);
      this.diagrama.push(diagrama);
    } else {
      alert('El proceso no fue creado. (Revisa si tienes un error en el nombre)');
    }
    this.nombre = 'A';
    this.rafagas = 0;
    this.tiempoDeLLegada = 0;
    this.prioridad = 0;
  }

  //Delete Diagramas by name
  deleteDiagramasByName(nombre: string = this.nombre) {
    if (this.validateName()) {
      for (var i = 0; i < this.diagrama.length; i++) {
        if (this.diagrama[i].nombre == nombre) {
          this.diagrama.splice(i, 1);
        }
      }
    } else {
      alert("El proceso no Existe.");
    }
    this.nombre = 'A';
  }

  //Delete all Diagramas
  deleteDiagramas() {
    this.diagrama.splice(0, this.diagrama.length);
  }

  //Validate rafagas
  validateRafagas = (rafagas: number = this.rafagas) => {
    if (rafagas > 0) {
      return true;
    } else {
      alert('Las Rafagas deben ser mayores que cero.');
      return false;
    }
  }

  //Validate tiempoDeLlegada
  validateTiempoDeLlegada = (tiempoDeLLegada: number = this.tiempoDeLLegada) => {
    if (tiempoDeLLegada >= 0) {
      return true;
    } else {
      alert('Tiempo de llegada debe de ser positivo.');
      return false;
    }
  }

  //Validate name
  validateName = (nombre: string = this.nombre) => {
    let verfica: boolean = false;
    this.diagrama.forEach(function (element) {
      if (element.nombre == nombre) {
        //alert('Ese nombre ya existe')
        verfica = true;
      }
    });
    return verfica;
  }

  //Validate prioridad
  validatePrioridad = () => {
    if (this.prioridad > 0) {
      return true;
    } else {
      alert('La Prioridad deben ser mayores que cero.');
      return false;
    }
  }

  //sort by tiempo de llegada
  sortByArrival() {
    this.diagrama.sort(function (a, b) {
      return a.tiempoDeLLegada - b.tiempoDeLLegada;
    });
  }

  //Sort definitivo rafagas
  sortByDefinitivoPorRafaga() {
    this.diagrama.sort(function (a: Diagramas, b: Diagramas) {
      if ((a.tiempoDeLLegada == b.tiempoDeLLegada)) {
        return a.rafagas - b.rafagas;
      } else {
        return 0;
      }
    });
  }
  //sort Auxiliar rafagas
  sortByTratadoAndRafaga(contador: number) {
    this.diagrama.sort(function (a: Diagramas, b: Diagramas) {
      if (!a.tratado && !b.tratado) {
        if (a.tiempoDeLLegada <= contador && b.tiempoDeLLegada <= contador) {
          return a.rafagas - b.rafagas;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }

  //Sort definitivo prioridad
  sortByDefinitivoPorPrioridad() {
    this.diagrama.sort(function (a: any, b: any) {
      if ((a.tiempoDeLLegada == b.tiempoDeLLegada)) {
        return a.prioridad - b.prioridad;
      } else {
        return 0;
      }
    });
  }
  //sort Auxiliar prioridad
  sortByTratadoAndPrioridad(contador: number) {
    this.diagrama.sort(function (a: any, b: any) {
      if (!a.tratado && !b.tratado) {
        if (a.tiempoDeLLegada <= contador && b.tiempoDeLLegada <= contador) {
          return a.prioridad - b.prioridad;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }

  //Quitar tratamiento
  quitarTratamiento() {
    this.diagrama.map(function (x: Diagramas) {
      x.tratado = false;
    })
  }

  //calculate waiting time & entrega FIRST COME FIRST SERVE
  calculateWaitingTimeAndArrivalFCFS() {
    this.quitarTratamiento();
    this.sortByArrival();
    let contador: number = 0;
    let delta: number = 0;
    let k: number = 0;
    this.tiempoPromedio = 0;

    if (this.diagrama.length > 0) {
      for (let i = 0; i < this.diagrama.length; i++) {
        if (i == 0) {
          this.diagrama[i].tiempoDeEntrega = this.diagrama[i].rafagas;
          this.diagrama[i].tiempoDeEspera = 0;
          this.diagrama[i].tiempoDeRespuesta = this.diagrama[i].tiempoDeEspera;
        } else {
          delta = this.diagrama[i].tiempoDeLLegada - this.diagrama[i - 1].tiempoDeLLegada;
          this.diagrama[i].tiempoDeEntrega = this.diagrama[i - 1].tiempoDeEntrega + this.diagrama[i].rafagas - delta;
          k = this.diagrama[i - 1].tiempoDeLLegada + this.diagrama[i - 1].tiempoDeEntrega;
          this.diagrama[i].tiempoDeEspera = k - this.diagrama[i].tiempoDeLLegada;
          this.diagrama[i].tiempoDeRespuesta = this.diagrama[i].tiempoDeEspera;
        }
        contador += this.diagrama[i].rafagas;
        this.tiempoPromedio += this.diagrama[i].tiempoDeEspera;
        k = 0;
        delta = 0;
      }
    }
    this.tiempoPromedio = (this.tiempoPromedio / this.diagrama.length);
    this.tiempoPromedio = parseFloat(this.tiempoPromedio.toFixed(3));
  }


  //calculate waiting time & entrega SHORTEST JOB FIRST
  calculateWaitingTimeAndArrivalSJF() {
    this.quitarTratamiento();
    this.sortByArrival();
    let contador: number = 0;
    let k: number = 0;
    this.tiempoPromedio = 0;
    this.sortByDefinitivoPorRafaga();

    for (let i = 0; i < this.diagrama.length; i++) {
      if ((i == 0)) {
        this.diagrama[i].tiempoDeEntrega = this.diagrama[i].rafagas;
        this.diagrama[i].tiempoDeRespuesta = 0;
        this.diagrama[i].tiempoDeEspera = 0;
        contador = this.diagrama[i].rafagas;
        this.diagrama[i].tratado = true;
        this.sortByTratadoAndRafaga(contador);
      } else {
        contador += this.diagrama[i].rafagas;
        this.diagrama[i].tiempoDeEntrega = contador - this.diagrama[i].tiempoDeLLegada;
        k = this.diagrama[i - 1].tiempoDeLLegada + this.diagrama[i - 1].tiempoDeEntrega;
        this.diagrama[i].tiempoDeEspera = k - this.diagrama[i].tiempoDeLLegada;
        this.diagrama[i].tiempoDeRespuesta = this.diagrama[i].tiempoDeEspera;
        this.diagrama[i].tratado = true;
      }
      this.sortByTratadoAndRafaga(contador);
      this.tiempoPromedio += this.diagrama[i].tiempoDeEspera;
    }
    k = 0
    this.tiempoPromedio = (this.tiempoPromedio / this.diagrama.length);
    this.tiempoPromedio = parseFloat(this.tiempoPromedio.toFixed(3));
    this.sortByArrival();
  }

  //calculate waiting time & entrega PRIORIDAD
  calculateWaitingTimeAndArrivalPRIORIDAD() {
    this.quitarTratamiento();
    this.sortByArrival();
    let contador: number = 0;
    let k: number = 0;
    this.tiempoPromedio = 0;
    this.sortByDefinitivoPorPrioridad();

    for (let i = 0; i < this.diagrama.length; i++) {
      if ((i == 0)) {
        this.diagrama[i].tiempoDeEntrega = this.diagrama[i].rafagas;
        this.diagrama[i].tiempoDeRespuesta = 0;
        this.diagrama[i].tiempoDeEspera = 0;
        contador = this.diagrama[i].rafagas;
        this.diagrama[i].tratado = true;
        this.sortByTratadoAndPrioridad(contador);
      } else {
        contador += this.diagrama[i].rafagas;
        this.diagrama[i].tiempoDeEntrega = contador - this.diagrama[i].tiempoDeLLegada;
        k = this.diagrama[i - 1].tiempoDeLLegada + this.diagrama[i - 1].tiempoDeEntrega;
        this.diagrama[i].tiempoDeEspera = k - this.diagrama[i].tiempoDeLLegada;
        this.diagrama[i].tiempoDeRespuesta = this.diagrama[i].tiempoDeEspera;
        this.diagrama[i].tratado = true;
      }
      this.sortByTratadoAndPrioridad(contador);
      this.tiempoPromedio += this.diagrama[i].tiempoDeEspera;
    }
    k = 0
    this.tiempoPromedio = (this.tiempoPromedio / this.diagrama.length);
    this.tiempoPromedio = parseFloat(this.tiempoPromedio.toFixed(3));
    this.sortByArrival();
  }


}
