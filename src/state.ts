import Game from "./game";

type State = {
  game: Game | null;
  moveDisabled: boolean;
  debug: boolean;
  windowResolution: {
    width: number;
    height: number;
  };
};

const state: State = {
  game: null,
  moveDisabled: false,
  debug: process.env.NODE_ENV === "development",
  windowResolution: {
    width: 255,
    height: 240
  },
};

export default state;
