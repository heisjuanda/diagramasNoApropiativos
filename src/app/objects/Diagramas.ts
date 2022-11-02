import { Diagrama } from "./Diagrama";

export class Diagramas implements Diagrama {

  nombre: string;
  rafagas: number;
  tiempoDeLLegada: number;
  tiempoDeEntrega: number;
  tiempoDeRespuesta: number;
  tiempoDeEspera: number;
  prioridad?: number;
  tratado?: boolean;
  rafagasTemporal:number;
  //tiempoDeEsperaPromedio: number;

  constructor(nombre: string, rafagas: number,tiempoDeLLegada: number,tiempoDeEntrega:number,tiempoDeEspera:number,tiempoDeRespuesta:number,prioridad?:number) {
    this.nombre = nombre;
    this.rafagas = rafagas;
    this.tiempoDeLLegada = tiempoDeLLegada;
    this.tiempoDeEntrega = tiempoDeEntrega;
    this.tiempoDeRespuesta = tiempoDeRespuesta;
    this.tiempoDeEspera = tiempoDeEspera;
    this.prioridad = prioridad;
    this.tratado = false;
    this.rafagasTemporal = rafagas;
  }



  /*getNombre(): string {
    return this.nombre;
  }

  getRafas(): number {
    return this.rafagas;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setRafagas(rafagas: number): void {
    if(rafagas>0){
      this.rafagas = rafagas;
    }else{
      alert("Rafagas cannot be negative or zero.");
      throw new Error("Rafagas cannot be negative or zero.");
    }
  }*/

}
