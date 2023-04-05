import "mocha";
import { expect } from "chai";
import Funko from "../../src/FunkoApp/Funko/funko.js";
import Usuario from "../../src/FunkoApp/Usuario/Ususario.js";
import { TipoFunko } from "../../src/FunkoApp/Funko/enumTipo.js";
import { GeneroFunko } from "../../src/FunkoApp/Funko/enumGenero.js";
import chalk from "chalk";

const Funko1 = new Funko(
  1,
  "Funko1",
  "Descripcion1",
  "Vynil Soda" as TipoFunko,
  "Animacion" as GeneroFunko,
  "Franquicia1",
  101,
  false,
  "Característica1",
  20
);
const Funko1_modif = new Funko(
  1,
  "FunkoModif",
  "Descripcion1",
  "Vynil Soda" as TipoFunko,
  "Animacion" as GeneroFunko,
  "Franquicia1",
  101,
  false,
  "Característica1",
  20
);
const Funko2 = new Funko(
  2,
  "Funko2",
  "Descripcion2",
  "Pop" as TipoFunko,
  "Musica" as GeneroFunko,
  "Franquicia2",
  102,
  false,
  "Característica2",
  30
);
const Funko3 = new Funko(
  3,
  "Funko3",
  "Descripcion3",
  "Pop Rides" as TipoFunko,
  "Deportes" as GeneroFunko,
  "Franquicia3",
  103,
  false,
  "Característica3",
  45
);

const usuario5 = new Usuario("Usuario5");
const usuario6 = new Usuario("Usuario6");
const usuarioVacio = new Usuario("UsuarioVacio");

describe("Probando la clase Usuario", () => {
  it("Probando la función addFunko", () => {
    expect(usuario5.addFunko(Funko1)).to.be.eql(
      chalk.green(
        `El funko con id ${Funko1.id} se ha añadido a la lista de ${usuario5.nombre} correctamente`
      )
    );
    expect(usuario5.addFunko(Funko2)).to.be.equal(
      chalk.green(
        `El funko con id ${Funko2.id} se ha añadido a la lista de ${usuario5.nombre} correctamente`
      )
    );
    expect(usuario5.addFunko(Funko2)).to.be.eql(
      chalk.red("Ya existe un funko con un ID igual en la lista de funkos")
    );
  });
  it("Probando la función deleteFunko", () => {
    expect(usuario6.deleteFunko(2)).to.be.eql(
      "La lista de funkos está vacía, no se pueden eliminar"
    );
    usuario6.addFunko(Funko1);
    expect(usuario6.deleteFunko(2)).to.be.equal(
      chalk.red(`El funko con id 2 no está en la lista del usuario`)
    );
    expect(usuario6.deleteFunko(1)).to.be.eql(
      chalk.green(
        `El funko con id 1 se ha eliminado de la lista de ${usuario6.nombre} correctamente`
      )
    );
  });
  it("Probando la función modifyFunko", () => {
    expect(usuario5.modifyFunko(Funko3)).to.be.eql(
      chalk.red(
        `El funko con id ${Funko3.id} no está entre la lista de funkos del usuario`
      )
    );
    expect(usuario5.modifyFunko(Funko1_modif)).to.be.equal(
      chalk.green(
        `El funko con id ${Funko1_modif.id} se ha modificado en la lista de ${usuario5.nombre}`
      )
    );
  });
  it("Probando la función listaDeFunkos", () => {
    expect(usuarioVacio.listaDeFunkos()).to.be.eql(undefined);
  });
  it("Probando la función printFunko", () => {
    expect(usuarioVacio.printFunko(1)).to.be.eql(
      chalk.red(`El funko con id 1 no está en la lista del usuario`)
    );
  });
});
