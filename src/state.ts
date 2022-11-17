import Game from "./game";

type State = {
  game: Game | null
  moveDisabled: boolean;
};

const state: State = {
  game: null,
  moveDisabled: false,
};

export default state;
