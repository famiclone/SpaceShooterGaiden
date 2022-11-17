import GameObject from "../gameobject";
import Renderer from "../renderer";

export default class IntroScene extends GameObject {
  constructor() {
    super();
  }

  update(dt: number) {
    this.children.forEach((child) => child.update(dt));
  }

  render(renderer: Renderer) {
    this.children.forEach((child) => child.render(renderer));
  }
}
