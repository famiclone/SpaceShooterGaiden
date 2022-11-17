import GameObject from "./gameobject";
import Player from "./player";
import Renderer from "./renderer";
import Scene from "./scene";
import Vector2 from "./vector2";

const levelData = {
  size: new Vector2(16 * 32, 16 * 32),
  pos: new Vector2(-200, -200),
  map: [],
};

export default class Level extends GameObject {
  scene: Scene = new Scene(levelData);
  player: Player = new Player();

  constructor() {
    super();

    this.scene.addChild(this.player);
  }

  update(dt: number) {
    this.scene?.update(dt);
  }

  addScene(scene: Scene) {
    this.scene = scene;
  }

  render(renderer: Renderer) {
    this.scene?.render(renderer);
  }
}
