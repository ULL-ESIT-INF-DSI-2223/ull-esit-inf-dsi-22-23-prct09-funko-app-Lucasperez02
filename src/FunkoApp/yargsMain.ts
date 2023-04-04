import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { GeneroFunko } from "./Funko/enumGenero.js";
import { TipoFunko } from "./Funko/enumTipo.js";
import Funko from "./Funko/funko.js";
import Usuario from "./Usuario/Ususario.js";

/**
 * Esta función comprueba si el genero pasado como string es válido entre los géneros del enumerado
 * @param genero
 * @returns
 */
function generoValido(genero: string): boolean {
  if (Object.values(GeneroFunko).indexOf(genero as GeneroFunko) === -1) {
    console.log("El genero no es correcto");
    return false;
  }
  return true;
}

/**
 * Esta función comprueba si el tipo pasado como string es válido entre los tipos del enumerado
 * @param tipo
 * @returns
 */
function tipoValido(tipo: string): boolean {
  if (Object.values(TipoFunko).indexOf(tipo as TipoFunko) === -1) {
    console.log("El tipo no es correcto");
    return false;
  }
  return true;
}
function yargsMain() {
  yargs(hideBin(process.argv))
    .command(
      "add",
      "Nuevo Funko añadido",
      {
        usuario: {
          description: "Nombre del usuario",
          type: "string",
          demandOption: true,
        },
        id: {
          description: "ID del Funko",
          type: "number",
          demandOption: true,
        },
        nombre: {
          description: "Nombre del Funko",
          type: "string",
          demandOption: true,
        },
        descripc: {
          description: "Descripción del Funko",
          type: "string",
          demandOption: true,
        },
        tipo: {
          description: "Tipo de Funko",
          type: "string",
          demandOption: true,
        },
        genero: {
          description: "Género del Funko",
          type: "string",
          demandOption: true,
        },
        franquicia: {
          description: "Franquicia",
          type: "string",
          demandOption: true,
        },
        numFranquicia: {
          description: "Numero en la franquicia",
          type: "number",
          demandOption: true,
        },
        exclusivo: {
          description: "Es exclusivo?",
          type: "boolean",
          demandOption: true,
        },
        caracteristicas: {
          description: "Características del funko",
          type: "string",
          demandOption: true,
        },
        valorMercado: {
          description: "Valor del funko en el mercado",
          type: "number",
          demandOption: true,
        },
      },
      (argv) => {
        if (argv.tipo && !tipoValido(argv.tipo)) return;
        if (argv.genero && !generoValido(argv.genero)) return;

        const usuario = new Usuario(argv.usuario);
        const funko = new Funko(
          argv.id,
          argv.nombre,
          argv.descripc,
          argv.tipo as TipoFunko,
          argv.genero as GeneroFunko,
          argv.franquicia,
          argv.numFranquicia,
          argv.exclusivo,
          argv.caracteristicas,
          argv.valorMercado
        );
        usuario.cargar();
        console.log(usuario.addFunko(funko));
        usuario.guardar();
      }
    )
    .command(
      "delete",
      "Eliminar un funko",
      {
        usuario: {
          description: "Nombre dle usuario",
          type: "string",
          demandOption: true,
        },
        id: {
          description: "ID del Funko",
          type: "number",
          demandOption: true,
        },
      },
      (argv) => {
        const usuario = new Usuario(argv.usuario);
        usuario.cargar();
        console.log(usuario.deleteFunko(argv.id));
        usuario.guardar();
      }
    );
}
