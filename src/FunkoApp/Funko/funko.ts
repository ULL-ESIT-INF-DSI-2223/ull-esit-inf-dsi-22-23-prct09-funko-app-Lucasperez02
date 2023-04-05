import { GeneroFunko } from "./enumGenero.js";
import { TipoFunko } from "./enumTipo.js";
import chalk from "chalk";

export default class Funko {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public tipo: TipoFunko;
  public genero: GeneroFunko;
  public franquicia: string;
  public numeroFranquicia: number;
  public esExclusivo: boolean;
  public características: string;
  public valorMercado: number;

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

    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.genero = genero;
    this.franquicia = franquicia;
    this.numeroFranquicia = numeroFranquicia;
    this.esExclusivo = esExclusivo;
    this.características = caracteristicas;
    this.valorMercado = valorMercado;
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
      infoFunko += `Valor: ${chalk.red(this.valorMercado)} (Caro), `;
    } else if (this.valorMercado >= 45) {
      infoFunko += `Valor: ${chalk.yellow(
        this.valorMercado
      )} (Precio elevado), `;
    } else if (this.valorMercado >= 25) {
      infoFunko += `Valor: ${chalk.blue(
        this.valorMercado
      )} (Media de precio), `;
    } else if (this.valorMercado <= 15) {
      infoFunko += `Valor: ${chalk.green(this.valorMercado)} (Barato), `;
    }
    console.log(infoFunko);
    return infoFunko;
  }
}
