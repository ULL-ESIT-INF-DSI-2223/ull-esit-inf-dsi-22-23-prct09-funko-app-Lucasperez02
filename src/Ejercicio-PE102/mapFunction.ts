export default abstract class MapReduceClass {
  protected listNumbers: number[];
  protected funcionCallback: (item: number) => number;
  protected listNumbersSol: number[];

  /**
   * Constructor clase MapReduceClass
   * @param listIn
   * @param callback
   * @param listOut
   */
  constructor(
    protected listIn: number[],
    protected callback: (item: number) => number
  ) {
    this.listNumbers = listIn;
    this.funcionCallback = callback;
    this.listNumbersSol = [];
  }

  /**
   * Fución myMap
   * @returns
   */

  protected myMap() {
    for (let i = 0; i < this.listNumbers.length; i++) {
      this.listNumbersSol.push(this.funcionCallback(this.listNumbers[i]));
    }
    return this.listNumbersSol;
  }

  protected abstract reduceFunction(): number;

  /**
   * Método de plantilla
   */
  public operate() {
    // Hook para mostrar la lista de números (antes del map)
    this.mostrarListNumber();

    // Operación map
    this.myMap();

    // Hook para mostrar la lista de números (después del map y antes del reduce)
    this.mostrarListNumber();

    // Aplicando la función reduce
    return this.reduceFunction();
  }

  /**
   * Hook que mostrará por pantalla el array a aplicarle la operación
   */
  protected mostrarListNumber() {
    console.log(`Array de números de la oepración: ${this.listNumbers}`);
  }
}
