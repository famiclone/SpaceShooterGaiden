import Renderer from "./renderer";
import state from "./state";
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
  id: string = Math.random().toString(16).substring(0, 5);

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

  debugDraw(renderer: Renderer, info: boolean = false) {
    if (state.debug) {
      renderer.ctx.strokeStyle = "magenta";
      renderer.ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);

      if (info) {
        renderer.ctx.strokeStyle = "green";
        renderer.ctx.font = "8px monospace";
        renderer.ctx.strokeText(this.id, this.pos.x, this.pos.y - 4);
      }
    }
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
    this.debugDraw(renderer);
  }

  isOutOfParent(pos: Vector2) {
    return (
      pos.clone().add(new Vector2(this.size.x, 0)).x >=
        this.parent!.size.x + this.parent!.pos.x ||
      pos.clone().add(new Vector2(0, this.size.y)).y >=
        this.parent!.size.y + this.parent!.pos.y ||
      pos.x <= this.parent!.pos.x ||
      pos.y <= this.parent!.pos.y
    );
  }
}

