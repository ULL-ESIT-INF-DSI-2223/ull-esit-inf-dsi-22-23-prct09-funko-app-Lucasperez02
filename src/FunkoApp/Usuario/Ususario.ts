import chalk from "chalk";
import fs from "fs";
import Funko from "../Funko/funko.js";
export default class Usuario {
  public misFunkos: Funko[];
  public nombre: string;

  constructor(nombre: string) {
    this.misFunkos = [];
    this.nombre = nombre;
    if (this.hayUsuario(nombre) === false) {
      console.log(`NO existe el usuario, se procede a crear una cuenta`);
      fs.mkdirSync("./src/FunkoApp/Usuarios/" + nombre);
    } else {
      console.log(chalk.yellow(`Cargando datos de ${nombre}`));

      const usuariosConFichero = fs.readdirSync(
        "./src/FunkoApp/Usuarios/" + nombre + "/"
      );

      if (usuariosConFichero.length === 0) {
        console.log(chalk.red("Usuario sin funkos"));
      } else {
        usuariosConFichero.forEach((ficheroDelUsuario) => {
          const funkoJSON = JSON.parse(
            fs
              .readFileSync(
                "./src/FunkoApp/Usuarios/" + nombre + "/" + ficheroDelUsuario
              )
              .toString()
          );
          this.misFunkos.push(
            new Funko(
              funkoJSON.id,
              funkoJSON.nombre,
              funkoJSON.descripcion,
              funkoJSON.tipo,
              funkoJSON.genero,
              funkoJSON.franquicia,
              funkoJSON.numeroFranquicia,
              funkoJSON.esExclusivo,
              funkoJSON.características,
              funkoJSON.valorMercado
            )
          );
        });
      }
    }
  }

  /**
   * Este método devolverá true o false si ya existe la ruta del usuario o no
   */
  hayUsuario(nombreUsuario: string): boolean {
    return fs.existsSync("./src/FunkoApp/Usuarios/" + nombreUsuario);
  }

  /**
   * Añade un funko a la lista del usuario
   * @param funkoNuevo
   */
  addFunko(funkoNuevo: Funko): string {
    let seAñade = true;
    this.misFunkos.forEach((funko) => {
      if (funko.id === funkoNuevo.id) {
        seAñade = false;
      }
    });

    if (seAñade) {
      this.misFunkos.push(funkoNuevo);
      const datosFunko = JSON.stringify(funkoNuevo);
      fs.writeFileSync(
        "./src/FunkoApp/Usuarios/" +
          this.nombre +
          "/" +
          "funko" +
          funkoNuevo.id +
          ".json",
        datosFunko
      );
      return chalk.green(
        `El funko con id ${funkoNuevo.id} se ha añadido a la lista de ${this.nombre} correctamente`
      );
    } else {
      return chalk.red(
        "Ya existe un funko con un ID igual en la lista de funkos"
      );
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
      return chalk.red(
        `El funko con id ${funkoID} no está en la lista del usuario`
      );
    }

    this.misFunkos.splice(indice, 1);
    fs.rmSync(
      "./src/FunkoApp/Usuarios/" +
        this.nombre +
        "/" +
        "funko" +
        funkoID +
        ".json"
    );
    return chalk.green(
      `El funko con id ${funkoID} se ha eliminado de la lista de ${this.nombre} correctamente`
    );
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
      return chalk.red(
        `El funko con id ${funkoModif.id} no está entre la lista de funkos del usuario`
      );
    }

    this.misFunkos = this.misFunkos.map((funko) =>
      funko.id === funkoModif.id ? funkoModif : funko
    );
    const datosFunko = JSON.stringify(funkoModif);
    fs.writeFileSync(
      "./src/FunkoApp/Usuarios/" +
        this.nombre +
        "/" +
        "funko" +
        funkoModif.id +
        ".json",
      datosFunko
    );
    return chalk.green(
      `El funko con id ${funkoModif.id} se ha modificado en la lista de ${this.nombre}`
    );
  }

  /**
   * Imprime todos los funkos del usuario
   */
  listaDeFunkos() {
    if (this.misFunkos.length === 0) {
      console.log(
        chalk.red("Usuario con 0 Funkos, añada alguno con la opción add")
      );
    } else {
      this.misFunkos.forEach((funko) => {
        funko.print();
      });
    }
  }

  /**
   * Imprime el funko que se indica del usuario
   */
  printFunko(funkoID: number) {
    const indice = this.misFunkos.findIndex((funko) => funko.id === funkoID);
    if (indice === -1) {
      return chalk.red(
        `El funko con id ${funkoID} no está en la lista del usuario`
      );
    }
    this.misFunkos[indice].print();
  }
}
