import GameObject, { Stats } from "./gameobject";
import Renderer from "./renderer";
import { isOutOfScreen } from "./utils";
import Vector2 from "./vector2";

export class Bullet extends GameObject {
  constructor(
    public pos: Vector2,
    public vel: Vector2,
    public speed: number = 1
  ) {
    super();
  }

  update(dt: number) {
    this.pos.add(this.vel.clone().mul(new Vector2(this.speed, this.speed)));
  }

  render(renderer: Renderer) {
    renderer.ctx.fillStyle = "white";

    renderer.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }
}

export default class Player extends GameObject {
  stats: Stats = new Stats();
  bullets: Bullet[] = [];

  constructor() {
    super();
  }

  fire() {
    const centeredPos = new Vector2(
      this.pos.x + this.size.x / 2,
      this.pos.y + this.size.y / 2
    );
    const bullet = new Bullet(centeredPos, new Vector2(0, -1), 2);
    this.bullets.push(bullet);
  }

  update(dt: number) {
    this.pos.add(this.vel);

    this.bullets.forEach((bullet) => {
      bullet.update(dt);
    });
  }

  render(renderer: Renderer) {
    renderer.drawSprite(0, 24, 16, 16, this.pos.x, this.pos.y, 16, 16);

    this.bullets.forEach((bullet) => {
      bullet.render(renderer);
    });

    this.bullets = this.bullets.filter((bullet) => {
      if (
        !isOutOfScreen(bullet, renderer.canvas.width, renderer.canvas.height)
      ) {
        return bullet;
      }
    });
  }
}
