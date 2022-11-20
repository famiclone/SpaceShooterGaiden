import { GameState } from "./game";
import GameObject from "./gameobject";
import Person from "./person";
import Player from "./player";
import Renderer from "./renderer";
import Scene from "./scene";
import state from "./state";
import Vector2 from "./vector2";

const levelData = {
  size: new Vector2(16 * 32, 16 * 10),
  pos: new Vector2(-0, -0),
  map: function() { return Array(this.size.x * this.size.y).fill(0)}
};

export default class Level extends GameObject {
  scene: Scene;
  player: Player;

  constructor() {
    super();

    this.player = new Player(
      new Vector2(
        state.windowResolution.width / 2 - 16,
        state.windowResolution.height / 2 - 16
      )
    );

    this.scene = new Scene(levelData, this.player);

    for (let i = 0; i < 10; i++) {
      const enemy = new Person(
        new Vector2(Math.random() * 100, Math.random() * 100),
        `enemy_${i}`
      );
      enemy.id = "enemy";
      this.scene.addChild(enemy);
    }
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
