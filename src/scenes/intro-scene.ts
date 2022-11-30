import GameObject from "../gameobject";
import Renderer from "../renderer";
import Vector2 from "../vector2";

export default class IntroScene extends GameObject {
  constructor() {
    super(new Vector2(0, 0), "intro-scene");
  }

  update(dt: number) {
    this.children.forEach((child) => child.update(dt));
  }

  render(renderer: Renderer) {
    this.children.forEach((child) => child.render(renderer));
  }
}
