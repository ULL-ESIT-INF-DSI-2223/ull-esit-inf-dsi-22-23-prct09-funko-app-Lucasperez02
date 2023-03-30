import { generoFunkoToString, GeneroFunko } from "./enumGenero.js";
import { TipoFunko, tipoFunkoToString } from "./enumTipo.js";

export default class Funko {
  private id: string;
  private nombre: string;
  private descripcion: string;
  private tipo: TipoFunko;
  private genero: GeneroFunko;
  private franquicia: string;
  private numero: number;
  private esExclusivo: boolean;
  private características: string;
  private valorMercado: number;

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
