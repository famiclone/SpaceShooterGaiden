import Logger from "./logger";

//export default class Controller {
//  keys: string[] = [];
//
//  constructor(player: Player) {
//    console.log("Controller created");
//
//    window.addEventListener("keydown", (e) => this.handleKeyDown(e, player));
//    window.addEventListener("keyup", (e) => this.handleKeyUp(e, player));
//  }
//
//  handleKeyDown(e: KeyboardEvent, player: Player) {
//    this.keys[e.code] = true;
//
//    switch (e.code) {
//      case "KeyW":
//        e.preventDefault();
//        player.move("n");
//        break;
//      case "KeyS":
//        e.preventDefault();
//        player.move("s");
//        break;
//      case "KeyA":
//        e.preventDefault();
//        player.move("w");
//        break;
//      case "KeyD":
//        e.preventDefault();
//        player.move("e");
//        break;
//      default:
//        e.preventDefault();
//    }
//  }
//
//  handleKeyUp(e: KeyboardEvent, player: Player) {
//    this.keys[e.code] = false;
//
//    if (
//      !this.keys["KeyW"] &&
//      !this.keys["KeyS"] &&
//      !this.keys["KeyA"] &&
//      !this.keys["KeyD"]
//    ) {
//      player.stop();
//    }
//  }
//}
