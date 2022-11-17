import GameObject, { Stats } from "./gameobject";
import Renderer from "./renderer";
import state from "./state";
import { isOutOfScreen } from "./utils";
import Vector2 from "./vector2";

const weaponTypes = {
  basic: {
    damage: 10,
    speed: 5,
    color: "red",
    size: [2, 2],
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
    this.size = new Vector2(
      weaponTypes[this.type].size[0],
      weaponTypes[this.type].size[1]
    );
    this.id = "player-bullet";
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
    this.debugDraw(renderer);

    renderer.ctx.fillStyle = weaponTypes[this.type].color;

    renderer.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }
}

export default class Player extends GameObject {
  stats: Stats = new Stats();
  bullets: Bullet[] = [];

  constructor() {
    super();
    this.id = "player";
    this.size = new Vector2(16, 16);
    this.pos = new Vector2(255 / 2 - this.size.x, 240 / 2 - this.size.y);
    this.stats.health = 50;
    this.speed = 2;
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

  move(direction: Vector2) {
    if (state.moveDisabled) {
      return;
    }

    const oldPos = this.pos.clone();
    const newPos = this.pos
      .clone()
      .add(direction.mul(new Vector2(this.speed, this.speed)));

    const distance = 50;

    if (
      newPos.clone().add(new Vector2(this.size.x, distance)).x >=
        this.parent!.size.x + this.parent!.pos.x ||
      newPos.clone().add(new Vector2(0, this.size.y)).y >=
        this.parent!.size.y + this.parent!.pos.y ||
      newPos.x <= this.parent!.pos.x ||
      newPos.y <= this.parent!.pos.y
    ) {
      return;
    } else {
      this.pos = newPos;
    }

    if (newPos.x <= distance) {
      this.pos = oldPos;
      this.parent!.pos.x += this.speed;
    }

    if (newPos.y <= distance) {
      this.pos = oldPos;
      this.parent!.pos.y += this.speed;
    }

    if (
      newPos.clone().add(new Vector2(this.size.x, 0)).x >=
      state.game!.renderer.windowSize.width - 50
    ) {
      this.pos = oldPos;
      this.parent!.pos.x -= this.speed;
    }

    if (
      newPos.clone().add(new Vector2(0, this.size.y)).y >=
      state.game!.renderer.windowSize.height - 50
    ) {
      this.pos = oldPos;
      this.parent!.pos.y -= this.speed;
    }
  }

  update(dt: number) {
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
    this.debugDraw(renderer);
  }
}
