import GameObject from "./gameobject";
import Player from "./player";

export default class Scene extends GameObject {
  player: Player

  constructor() {
    super();

    this.player = new Player();
  }
}
