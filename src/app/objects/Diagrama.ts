export interface Diagrama {
  nombre: string;
  rafagas:number;//cantidad rafagas
  tiempoDeLLegada:number;//cuando llega
  tiempoDeEntrega:number;//desde que llega hasta terminar
  tiempoDeRespuesta:number;//tiempo que espera hasta entrar por primera vez al la cpu
  tiempoDeEspera:number;//tiempo que espera total
  //tiempoDeEsperaPromedio:number;//tiempo de espera promedio
  prioridad?:number;//prioridad
  tratado?:boolean;//tratado
}
