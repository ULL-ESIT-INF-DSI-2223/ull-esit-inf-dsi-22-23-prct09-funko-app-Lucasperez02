import { GeneroFunko } from "./enumGenero.js";
import { TipoFunko } from "./enumTipo.js";
import chalk from "chalk";

export default class Funko {
  private _id: number;
  private _nombre: string;
  private _descripcion: string;
  private _tipo: TipoFunko;
  private _genero: GeneroFunko;
  private _franquicia: string;
  private _numeroFranquicia: number;
  private _esExclusivo: boolean;
  private _características: string;
  private _valorMercado: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: TipoFunko,
    genero: GeneroFunko,
    franquicia: string,
    numeroFranquicia: number,
    esExclusivo: boolean,
    caracteristicas: string,
    valorMercado: number
  ) {
    if (nombre === "") {
      throw new Error("nombre inválido");
    }
    if (valorMercado <= 0) {
      throw new Error("valor de mercado inválido");
    }

    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._tipo = tipo;
    this._genero = genero;
    this._franquicia = franquicia;
    this._numeroFranquicia = numeroFranquicia;
    this._esExclusivo = esExclusivo;
    this._características = caracteristicas;
    this._valorMercado = valorMercado;
  }

  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get descripcion() {
    return this._descripcion;
  }
  get tipo() {
    return this._tipo;
  }
  get genero() {
    return this._genero;
  }
  get franquicia() {
    return this._franquicia;
  }
  get numeroFranquicia() {
    return this._numeroFranquicia;
  }
  get esExclusivo() {
    return this._esExclusivo;
  }
  get características() {
    return this._características;
  }
  get valorMercado() {
    return this._valorMercado;
  }

  print(): string {
    let infoFunko = "";
    infoFunko += `ID: ${this.id}, `;
    infoFunko += `Nombre: ${this.nombre}, `;
    infoFunko += `Descripción: ${this.descripcion}, `;
    infoFunko += `Tipo del Funko: ${this.tipo}, `;
    infoFunko += `Género del Funko: ${this.genero}, `;
    infoFunko += `Franquicia: ${this.franquicia}, `;
    infoFunko += `Número en la franquicia: ${this.numeroFranquicia}, `;
    infoFunko += `Exclusividad: ${this.esExclusivo}, `;
    infoFunko += `Características: ${this.características}, `;
    if (this.valorMercado >= 65) {
      infoFunko += `Valor: ${chalk.red(this.valorMercado)} (Caro)`;
    } else if (this.valorMercado >= 45) {
      infoFunko += `Valor: ${chalk.yellow(this.valorMercado)} (Precio elevado)`;
    } else if (this.valorMercado >= 25) {
      infoFunko += `Valor: ${chalk.blue(this.valorMercado)} (Media de precio)`;
    } else if (this.valorMercado <= 24) {
      infoFunko += `Valor: ${chalk.green(this.valorMercado)} (Barato)`;
    }
    console.log(infoFunko);
    return infoFunko;
  }
}
