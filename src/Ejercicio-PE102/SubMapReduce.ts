import MapReduceClass from "./mapFunction.js";

/**
 * Clase para hacer el reduce Sub al resultado del map
 */
export default class SubMapReduce extends MapReduceClass {
  /**
   * Aplica la reducción como resta
   * @returns number
   */
  reduceFunction(): number {
    let acumulador = 0;
    for (let i = 0; i < super.listNumbersSol.length; i++) {
      acumulador = acumulador - super.listNumbersSol[i];
    }
    return acumulador;
  }
}
