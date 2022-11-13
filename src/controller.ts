import Logger from "./logger";
import Player from "./player";

export default class Controller {
  keys: { [key: string]: boolean } = {};

  constructor(player: Player) {
    console.log("Controller created");

    window.addEventListener("keydown", (e) => this.handleKeyDown(e, player));
    window.addEventListener("keyup", (e) => this.handleKeyUp(e, player));
  }

  handleKeyDown(e: KeyboardEvent, player: Player) {
    this.keys[e.code] = true;

    switch (e.code) {
      case "KeyW":
        e.preventDefault();
        //player.move("n");
        player.vel.y = -1;
        break;
      case "KeyS":
        e.preventDefault();
        player.vel.y = 1;
        //player.move("s");
        break;
      case "KeyA":
        player.vel.x = -1;
        e.preventDefault();
        //player.move("w");
        break;
      case "KeyD":
        player.vel.x = 1;
        e.preventDefault();
        //player.move("e");
        break;
      case "Space":
        e.preventDefault();
        player.fire();
        break;
      default:
        e.preventDefault();
    }

    console.log(this.keys);
  }

  handleKeyUp(e: KeyboardEvent, player: Player) {
    this.keys[e.code] = false;
    delete this.keys[e.code];

    if (
      !this.keys["KeyW"] &&
      !this.keys["KeyS"] &&
      !this.keys["KeyA"] &&
      !this.keys["KeyD"]
    ) {
      console.log(this.keys);
      player.vel.reset();
    }
  }
}
