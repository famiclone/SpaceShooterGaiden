import Game from "./game";
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
  "Enter",
];

export default class Controller {
  keys: { [key: string]: 0 | 1 } = {};

  constructor() {
    console.log("Controller created");

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

  keyIsDown(key: string): number {
    return this.keys[key];
  }

  clearKeys() {
    this.keys = {};
  }
}
