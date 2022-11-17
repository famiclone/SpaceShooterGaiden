import Game from "./game";

type State = {
  game: Game | null;
  moveDisabled: boolean;
  debug: boolean;
};

const state: State = {
  game: null,
  moveDisabled: false,
  debug: process.env.NODE_ENV === "development",
};

export default state;
