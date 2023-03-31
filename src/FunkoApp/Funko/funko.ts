import { generoFunkoToString, GeneroFunko } from "./enumGenero.js";
import { TipoFunko, tipoFunkoToString } from "./enumTipo.js";

export default class Funko {
  public id: string;
  public nombre: string;
  public descripcion: string;
  public tipo: TipoFunko;
  public genero: GeneroFunko;
  public franquicia: string;
  public numero: number;
  public esExclusivo: boolean;
  public características: string;
  public valorMercado: number;

  constructor(
    id: string,
    nombre: string,
    descripcion: string,
    tipo: TipoFunko,
    genero: GeneroFunko,
    franquicia: string,
    numero: number,
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
    this.numero = numero;
    this.esExclusivo = esExclusivo;
    this.características = caracteristicas;
    this.valorMercado = valorMercado;
  }
}
