import MapReduceClass from "./mapFunction.js";

/**
 * Clase para hacer el reduce Div al resultado del map
 */
export default class ProdMapReduce extends MapReduceClass {
  /**
   * Aplica la reducción como división
   * @returns number
   */
  reduceFunction(): number {
    let acumulador = 1;
    for (let i = 0; i < super.listNumbersSol.length; i++) {
      acumulador = super.listNumbersSol[i] / acumulador;
    }
    return acumulador;
  }
}
