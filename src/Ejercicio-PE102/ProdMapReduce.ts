import MapReduceClass from "./mapFunction.js";

/**
 * Clase para hacer el reduce Prod al resultado del map
 */
export default class ProdMapReduce extends MapReduceClass {
  /**
   * Aplica la reducción como multiplicación
   * @returns number
   */
  reduceFunction(): number {
    let acumulador = 1;
    for (let i = 0; i < super.listNumbersSol.length; i++) {
      acumulador = acumulador * super.listNumbersSol[i];
    }
    return acumulador;
  }
}
