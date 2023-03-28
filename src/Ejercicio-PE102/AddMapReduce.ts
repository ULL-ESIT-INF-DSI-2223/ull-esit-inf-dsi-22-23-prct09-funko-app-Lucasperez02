import MapReduceClass from "./mapFunction.js";

/**
 * Clase para hacer el reduce Add al resultado del map
 */
export default class AddMapReduce extends MapReduceClass {
  /**
   * Aplica la reducción como suma
   * @returns number
   */
  reduceFunction(): number {
    let acumulador = 0;
    for (let i = 0; i < super.listNumbersSol.length; i++) {
      acumulador = acumulador + super.listNumbersSol[i];
    }
    return acumulador;
  }
}
