//import ListaFunkos from "../ListaFunko/listaFunkos.js";
import fs from "fs";
import Funko from "../Funko/funko.js";
export default class Usuario {
  public misFunkos: Funko[];
  public nombre: string;

  constructor(nombre: string) {
    this.misFunkos = [];
    this.nombre = nombre;
  }

  /**
   * Añade un funko a la lista del usuario
   * @param funkoNuevo
   */
  addFunko(funkoNuevo: Funko): string {
    if (this.misFunkos.map((funko) => funko.id === funkoNuevo.id)) {
      return "Ya existe un funko con un ID igual en la lista de funkos";
    } else {
      this.misFunkos.push(funkoNuevo);
      return `El funko con id ${funkoNuevo.id} se ha añadido a la lista de ${this.nombre} correctamente`;
    }
  }

  /**
   * Elimina un funko de la lista del usuario
   * @param funkoID
   */
  deleteFunko(funkoID: number): string {
    if (this.misFunkos.length === 0) {
      return "La lista de funkos está vacía, no se pueden eliminar";
    }

    const indice = this.misFunkos.findIndex((funko) => funko.id === funkoID);
    if (indice === -1) {
      return `El funko con id ${funkoID} no está en la lista del usuario`;
    }

    this.misFunkos.splice(indice, 1);
    return `El funko con id ${funkoID} se ha eliminado de la lista de ${this.nombre} correctamente`;
  }

  /**
   * Función que modifica la lista de funkos del usuario
   * @param funkoModif
   * @returns
   */
  modifyFunko(funkoModif: Funko): string {
    const indice = this.misFunkos.findIndex(
      (funko) => funko.id === funkoModif.id
    );
    if (indice === -1) {
      return `El funko con id ${funkoModif.id} no está entre la lista de funkos del usuario`;
    }

    this.misFunkos = this.misFunkos.map((funko) =>
      funko.id === funkoModif.id ? funkoModif : funko
    );
    return `El funko con id ${funkoModif.id} se ha modificado en la lista de ${this.nombre}`;
  }

  /**
   * Método que guarda en el fichero JSON la información del usuario
   * @returns void
   */
  guardar(): void {
    this.misFunkos.sort((a, b) => (a.id < b.id ? -1 : 1));
    const nombre = this.nombre.replace(/ /g, "_");
    const data = JSON.stringify(this);
    fs.writeFileSync(`./data/users/${nombre}.json`, data);
  }

  /**
   * Método que carga desde el fichero JSON la información del usuario
   * @returns void
   */
  cargar(): void {
    const nombre = this.nombre.replace(/ /g, "_");
    if (!fs.existsSync(`./data/users/${nombre}.json`)) {
      this.guardar();
      return;
    }
    const fichero = fs.readFileSync(`./data/users/${nombre}.json`, "utf8");
    const usuario = JSON.parse(fichero);
    this.misFunkos = usuario.misFunkos;
  }
}
