export enum TipoFunko {
  POP,
  POP_RIDES,
  VYNIL_SODA,
  VYNIL_GOLD,
}

export function tipoFunkoToString(tipoFunko: TipoFunko): string {
  switch (tipoFunko) {
    case TipoFunko.POP: {
      return "Pop";
    }
    case TipoFunko.POP_RIDES: {
      return "Pop Rides";
    }
    case TipoFunko.VYNIL_SODA: {
      return "Vynil Soda";
    }
    case TipoFunko.VYNIL_GOLD: {
      return "Vynil Gold";
    }
  }
}
