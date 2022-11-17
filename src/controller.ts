import Game from "./game";
import Logger from "./logger";
import Player from "./player";

const approvedKeys = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "Space",
  "Escape",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
];

export default class Controller {
  keys: { [key: string]: 0 | 1 } = {};
  game: Game;
  player: Player;

  constructor(game: Game) {
    console.log("Controller created");
    this.game = game;
    this.player = game.level.player;

    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e));
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!approvedKeys.includes(e.code)) {
      return;
    }

    e.preventDefault();

    this.keys[e.code] = 1;
  }

  handleKeyUp(e: KeyboardEvent) {
    this.keys[e.code] = 0;
  }

  keyIsDown(key: string): boolean {
    return this.keys[key] === 1 || false;
  }

  clearKeys() {
    this.keys = {};
  }
}
