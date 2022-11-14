import Renderer from "./renderer";
import Vector2 from "./vector2";

export default class GameObject {
  pos: Vector2 = new Vector2(0, 0);
  globalPos: Vector2 = new Vector2(0, 0);
  vel: Vector2 = new Vector2(0, 0);
  size: Vector2 = new Vector2(8, 8);
  rotation: number = 0;
  speed: number = 1;
  children: GameObject[] = [];
  parent: GameObject | null = null;

  constructor() {}

  addChild(child: GameObject) {
    if (this.children.includes(child)) {
      return;
    }

    if (child.parent) {
      child.parent.removeChild(child);
    }

    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: GameObject) {
    child.parent = null;
    this.children = this.children.filter((c) => c !== child);
  }

  update(dt: number) {
    this.children.forEach((child) => {
      child.update(dt);
    });
  }

  render(renderer: Renderer) {
    this.children.forEach((child) => {
      child.render(renderer);
    });
  }
}

export class Stats {
  health: number = 100;
  exp: number = 0;
  level: number = 1;
  damage: number = 10;
  speed: number = 1;
  defense: number = 1;
  constructor() {}
}