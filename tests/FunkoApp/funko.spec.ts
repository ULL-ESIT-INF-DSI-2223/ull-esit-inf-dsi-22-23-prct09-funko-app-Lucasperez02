import "mocha";
import { expect } from "chai";
import Funko from "../../src/FunkoApp/Funko/funko.js";
import { TipoFunko } from "../../src/FunkoApp/Funko/enumTipo.js";
import { GeneroFunko } from "../../src/FunkoApp/Funko/enumGenero.js";

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
const Funko4 = new Funko(
  4,
  "Funko4",
  "Descripcion4",
  "Vynil Gold" as TipoFunko,
  "Videojuegos" as GeneroFunko,
  "Franquicia4",
  104,
  true,
  "Característica4",
  89
);

describe("Probando la clase Funko", () => {
  it("Probando errores en el cosntructor", () => {
    expect(
      () =>
        new Funko(
          4,
          "",
          "Descripcion4",
          "Vynil Gold" as TipoFunko,
          "Videojuegos" as GeneroFunko,
          "Franquicia4",
          104,
          true,
          "Característica4",
          89
        )
    ).to.throw("nombre inválido");
    expect(
      () =>
        new Funko(
          4,
          "Funko4",
          "Descripcion4",
          "Vynil Gold" as TipoFunko,
          "Videojuegos" as GeneroFunko,
          "Franquicia4",
          104,
          true,
          "Característica4",
          0
        )
    ).to.throw("valor de mercado inválido");
  });
  it("Getter del id", () => {
    expect(Funko1.id).to.be.equal(1);
    expect(Funko4.id).to.be.equal(4);
  });
  it("Getter del nombre", () => {
    expect(Funko1.nombre).to.be.equal("Funko1");
    expect(Funko4.nombre).to.be.equal("Funko4");
  });
  it("Getter de la descripción", () => {
    expect(Funko1.descripcion).to.be.equal("Descripcion1");
    expect(Funko4.descripcion).to.be.equal("Descripcion4");
  });
  it("Getter del tipo", () => {
    expect(Funko1.tipo).to.be.eql(TipoFunko.VYNIL_SODA);
    expect(Funko4.tipo).to.be.eql(TipoFunko.VYNIL_GOLD);
  });
  it("Getter del genero", () => {
    expect(Funko1.genero).to.be.eql(GeneroFunko.ANIMACION);
    expect(Funko4.genero).to.be.eql(GeneroFunko.VIDEOJUEGOS);
  });
  it("Getter de la franquicia", () => {
    expect(Funko2.franquicia).to.be.equal("Franquicia2");
    expect(Funko3.franquicia).to.be.equal("Franquicia3");
  });
  it("Getter del numeFranquicia", () => {
    expect(Funko2.numeroFranquicia).to.be.equal(102);
    expect(Funko3.numeroFranquicia).to.be.equal(103);
  });
  it("Getter de esExclusivo", () => {
    expect(Funko2.esExclusivo).to.be.equal(false);
    expect(Funko3.esExclusivo).to.be.equal(false);
  });
  it("Getter de las características", () => {
    expect(Funko2.características).to.be.equal("Característica2");
    expect(Funko3.características).to.be.equal("Característica3");
  });
  it("Getter del valorMercado", () => {
    expect(Funko2.valorMercado).to.be.equal(30);
    expect(Funko3.valorMercado).to.be.equal(45);
  });

  it("Probando el print", () => {
    expect(Funko1.print()).to.be.eql(
      "ID: 1, Nombre: Funko1, Descripción: Descripcion1, Tipo del Funko: Vynil Soda, Género del Funko: Animacion, Franquicia: Franquicia1, Número en la franquicia: 101, Exclusividad: false, Características: Característica1, Valor: 20 (Barato)"
    );
    expect(Funko4.print()).to.be.eql(
      "ID: 4, Nombre: Funko4, Descripción: Descripcion4, Tipo del Funko: Vynil Gold, Género del Funko: Videojuegos, Franquicia: Franquicia4, Número en la franquicia: 104, Exclusividad: true, Características: Característica4, Valor: 89 (Caro)"
    );
  });
});
