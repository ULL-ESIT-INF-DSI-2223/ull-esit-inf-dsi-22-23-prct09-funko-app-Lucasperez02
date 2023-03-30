export enum GeneroFunko {
  ANIMACION,
  PELICULAS_TV,
  VIDEOJUEGOS,
  DEPORTES,
  MUSICA,
  ANIME,
}

export function generoFunkoToString(generoFunko: GeneroFunko): string {
  switch (generoFunko) {
    case GeneroFunko.ANIMACION: {
      return "Animacion";
    }
    case GeneroFunko.PELICULAS_TV: {
      return "Peliculas y TV";
    }
    case GeneroFunko.VIDEOJUEGOS: {
      return "Videojuegos";
    }
    case GeneroFunko.DEPORTES: {
      return "Deportes";
    }
    case GeneroFunko.MUSICA: {
      return "Musica";
    }
    case GeneroFunko.ANIME: {
      return "Anime";
    }
  }
}
