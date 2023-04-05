import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { GeneroFunko } from "./Funko/enumGenero.js";
import { TipoFunko } from "./Funko/enumTipo.js";
import Funko from "./Funko/funko.js";
import Usuario from "./Usuario/Ususario.js";

//añadir node ./dist/FunkoApp/yargsMain.js add --usuario "Usuario1" --id 43 --nombre "Funko3" --descripc "Algo1" --tipo "Pop" --genero "Musica" --franquicia "AlgoFranq" --numFranquicia 35 --exclusivo true --caracteristicas "Tiene" --valorMercado 50

/**
 * Esta función comprueba si el genero pasado como string es válido entre los géneros del enumerado
 * @param genero
 * @returns
 */
function generoValido(genero: string): boolean {
  if (Object.values(GeneroFunko).indexOf(genero as GeneroFunko) === -1) {
    console.log(chalk.red("El genero no es correcto"));
    console.log(
      chalk.yellow(`Utilice los siguientes: ${Object.values(GeneroFunko)}`)
    );
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
    console.log(chalk.red("El tipo no es correcto"));
    console.log(
      chalk.yellow(`Utilice los siguientes: ${Object.values(TipoFunko)}`)
    );
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
        if (!tipoValido(argv.tipo)) return;
        if (!generoValido(argv.genero)) return;

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
        console.log(usuario.addFunko(funko));
      }
    )
    .command(
      "modify",
      "Modificar un funko",
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
        if (!tipoValido(argv.tipo)) return;
        if (!generoValido(argv.genero)) return;

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
        const usuario = new Usuario(argv.usuario);
        console.log(usuario.modifyFunko(funko));
      }
    )
    .command(
      "delete",
      "Eliminar un funko",
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
      },
      (argv) => {
        const usuario = new Usuario(argv.usuario);
        console.log(usuario.deleteFunko(argv.id));
      }
    )
    .command(
      "list",
      "Mostrar lista completa de funkos",
      {
        usuario: {
          description: "Nombre del usuario",
          type: "string",
          demandOption: true,
        },
      },
      (argv) => {
        const usuario = new Usuario(argv.usuario);
        usuario.listaDeFunkos();
      }
    )
    .command(
      "show",
      "Mostrar el funko con id específico",
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
      },
      (argv) => {
        const usuario = new Usuario(argv.usuario);
        usuario.printFunko(argv.id);
      }
    )
    .help().argv;
}

yargsMain();
