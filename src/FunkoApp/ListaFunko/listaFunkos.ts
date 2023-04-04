import Funko from "../Funko/funko.js";
export default class ListaFunkos {
  public funkosList: Funko[];
  constructor(funkosList: Funko[]) {
    this.funkosList = funkosList;
  }

  /**
   * Función para añadir un Funko a la lista de Funkos
   * @param funkoNuevo Nuevo funko a añadir
   */
  add(funkoNuevo: Funko) {
    if (this.funkosList.map((funko) => funko.id === funkoNuevo.id)) {
      console.log("Ya existe un funko con un ID igual en la lista de funkos");
    } else {
      this.funkosList.push(funkoNuevo);
      console.log(
        `El funko con id ${funkoNuevo.id} se ha añadido a la lista correctamente`
      );
    }
  }

  /**
   * Función para eliminar un funko de la lista de funkos pasándole el ID
   * @param funkoID Id del funko a eliminar
   */
  delete(funkoID: number) {
    const indice = this.funkosList.findIndex((funko) => funko.id === funkoID);

    this.funkosList.splice(indice, 1);
  }
}
