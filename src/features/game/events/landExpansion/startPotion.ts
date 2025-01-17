import { PotionName, GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type Potions = [PotionName, PotionName, PotionName, PotionName];

export type StartPotionAction = {
  type: "potion.started";
};

type Options = {
  state: Readonly<GameState>;
  action: StartPotionAction;
};

const GAME_FEE = 1;

export function startPotion({ state }: Options): GameState {
  const stateCopy = cloneDeep<GameState>(state);

  if (stateCopy.potionHouse?.game.status === "in_progress") {
    throw new Error("There is already a game in progress");
  }

  if (stateCopy.balance.lt(GAME_FEE)) {
    throw new Error("Insufficient funds to start a game");
  }

  stateCopy.balance = stateCopy.balance.sub(GAME_FEE);

  stateCopy.potionHouse = {
    game: { status: "in_progress", attempts: [] },
    history: stateCopy.potionHouse?.history ?? {},
  };

  return stateCopy;
}
