//import ListaFunkos from "../ListaFunko/listaFunkos.js";
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
      fs.mkdirSync(
        "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
          nombre
      );
      // console.log(chalk.green(`Bienvenido ${nombreUsuario}, se procede a cargar los datos de tu usuario`)
      // );
      // /* Guardo los nonbres de los ficheros en un array de strings */
      // const usuariosConFichero = fs.readdirSync(
      //   "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" + nombreUsuario + "/"
      // );
      // /* Voy abriendo cada fichero para extraer la información del JSON */
      // if (usuariosConFichero.length === 0) {
      //   log(chalk.red("Aun no has añadido ningun Funko a tu colección"));
      // } else {
      //   usuariosConFichero.forEach((ficheroActual) => {
      //     const funkoJSON = JSON.parse(
      //       fs
      //         .readFileSync("/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" + nombreUsuario + "/" + ficheroActual)
      //         .toString()
      //     );
      //     this.funkos.añadir(
      //       new Funko(
      //         funkoJSON.id,
      //         funkoJSON.nombre,
      //         funkoJSON.desc,
      //         funkoJSON.tipo,
      //         funkoJSON.genero,
      //         funkoJSON.franquicia,
      //         funkoJSON.numero,
      //         funkoJSON.exclusivo,
      //         funkoJSON.caracteristica_esp,
      //         funkoJSON.valor
      //       )
      //     );
      //   });
      // }
    } else {
      // console.log(`NO existe el usuario, se procede a crear una cuenta`);
      // fs.mkdirSync("/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" + nombreUsuario);
      console.log(chalk.yellow(`Cargando datos de ${nombre}`));
      // Comentar
      const usuariosConFichero = fs.readdirSync(
        "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
          nombre +
          "/"
      );

      //Comentar
      if (usuariosConFichero.length === 0) {
        console.log(chalk.red("Usuario sin funkos"));
      } else {
        usuariosConFichero.forEach((ficheroDelUsuario) => {
          const funkoJSON = JSON.parse(
            fs
              .readFileSync(
                "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
                  nombre +
                  "/" +
                  ficheroDelUsuario
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
      console.log(this.misFunkos.length);
    }
  }

  /**
   * Este método devolverá true o false si ya existe la ruta del usuario o no
   */
  hayUsuario(nombreUsuario: string): boolean {
    return fs.existsSync(
      "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
        nombreUsuario
    );
  }

  /**
   * Añade un funko a la lista del usuario
   * @param funkoNuevo
   */
  addFunko(funkoNuevo: Funko): string {
    // if (this.misFunkos.map((funko) => funko.id === funkoNuevo.id)) {
    //   return chalk.red(
    //     "Ya existe un funko con un ID igual en la lista de funkos"
    //   );
    // } else {
    this.misFunkos.push(funkoNuevo);
    const datosFunko = JSON.stringify(funkoNuevo);
    fs.writeFileSync(
      "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
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
    //}
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
      "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
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
      "/home/usuario/P09/ull-esit-inf-dsi-22-23-prct09-funko-app-Lucasperez02/src/FunkoApp/Usuarios/" +
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
    // if (this.misFunkos.length === 0) {
    //   console.log(chalk.red("Usuario con 0 Funkos"));
    // } else {
    this.misFunkos.forEach((funko) => {
      funko.print();
    });
    //}
  }

  /**
   * Imprimer el funko del usuario que se indica
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

  // /**
  //  * Método que guarda en el fichero JSON la información del usuario
  //  * @returns void
  //  */
  // guardar(): void {
  //   this.misFunkos.sort((a, b) => (a.id < b.id ? -1 : 1));
  //   const nombre = this.nombre.replace(/ /g, "_");
  //   const data = JSON.stringify(this);
  //   fs.writeFileSync(`./data/users/${nombre}.json`, data);
  // }

  // /**
  //  * Método que carga desde el fichero JSON la información del usuario
  //  * @returns void
  //  */
  // cargar(): void {
  //   const nombre = this.nombre.replace(/ /g, "_");
  //   if (!fs.existsSync(`./data/users/${nombre}.json`)) {
  //     this.guardar();
  //     return;
  //   }
  //   const fichero = fs.readFileSync(`./data/users/${nombre}.json`, "utf8");
  //   const usuario = JSON.parse(fichero);
  //   this.misFunkos = usuario.misFunkos;
  // }
}
