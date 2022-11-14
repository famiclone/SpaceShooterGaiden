import GameObject, { Stats } from "./gameobject";
import Renderer from "./renderer";
import { isOutOfScreen } from "./utils";
import Vector2 from "./vector2";

const weaponTypes = {
  basic: {
    damage: 10,
    speed: 5,
    color: "red",
  },
};

enum WeaponType {
  Basic = "basic",
}

export class Bullet extends GameObject {
  constructor(
    public pos: Vector2,
    public vel: Vector2,
    public type: WeaponType
  ) {
    super();
  }

  update(dt: number) {
    this.pos.add(
      this.vel
        .clone()
        .mul(
          new Vector2(
            weaponTypes[this.type].speed,
            weaponTypes[this.type].speed
          )
        )
    );
  }

  render(renderer: Renderer) {
    renderer.ctx.fillStyle = weaponTypes[this.type].color;

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
    const leftGunPos = new Vector2(this.pos.x, this.pos.y + 16);
    const rightGunPos = new Vector2(this.pos.x + 14, this.pos.y + 16);

    const leftBullet = new Bullet(
      leftGunPos,
      new Vector2(0, -1),
      WeaponType.Basic
    );
    this.bullets.push(leftBullet);

    const bullet = new Bullet(
      rightGunPos,
      new Vector2(0, -1),
      WeaponType.Basic
    );
    this.bullets.push(bullet);

    console.log(this.bullets);
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

    this.bullets = this.bullets.filter(
      (bullet) =>
        !isOutOfScreen(bullet, renderer.canvas.width, renderer.canvas.height)
    );
  }
}
