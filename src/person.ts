import GameObject from "./gameobject";
import Renderer from "./renderer";
import Vector2 from "./vector2";
import { zzfx } from "zzfx";

export const weaponTypes = {
  basic: {
    damage: 10,
    speed: 0.5,
    color: "red",
    size: [2, 2],
    rechargeTime: 500,
  },
};

export enum WeaponType {
  Basic = "basic",
}

export class Stats {
  health: number = 100;
  exp: number = 0;
  level: number = 1;
  damage: number = 10;
  speed: number = 1;
  defense: number = 1;
  recharged: number = 0;
}

export class Bullet extends GameObject {
  constructor(
    public pos: Vector2,
    public vel: Vector2,
    public type: WeaponType
  ) {
    super(pos, "bullet");
    this.size = new Vector2(
      weaponTypes[this.type].size[0],
      weaponTypes[this.type].size[1]
    );
  }

  update(dt: number) {
    this.pos.add(
      this.vel
        .clone()
        .mul(
          new Vector2(
            weaponTypes[this.type].speed * dt,
            weaponTypes[this.type].speed * dt
          )
        )
    );
  }

  render(renderer: Renderer) {
    renderer.ctx.save();
    this.debugDraw(renderer);

    renderer.ctx.fillStyle = weaponTypes[this.type].color;

    renderer.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    renderer.ctx.restore();
  }
}

export default class Person extends GameObject {
  stats: Stats = new Stats();
  bullets: Bullet[] = [];
  prevPos: Vector2 = new Vector2(0, 0);
  wasShot: boolean = false;

  constructor(pos: Vector2, id: string) {
    super(pos, id);
    this.id = id;
  }

  move(direction: Vector2) {
    this.prevPos = this.pos.clone();
    this.pos.add(direction);
  }

  fire(direction: Vector2, dt: number) {
    if (this.stats.recharged > weaponTypes.basic.rechargeTime) {
      let leftGunPos = new Vector2(this.pos.x, this.pos.y + 16);
      let rightGunPos = new Vector2(this.pos.x + 14, this.pos.y + 16);
      this.wasShot = true;

      this.spriteDirection = direction.clone();

      if (direction.y === 0) {
        leftGunPos = new Vector2(this.pos.x, this.pos.y);
        rightGunPos = new Vector2(this.pos.x, this.pos.y + 14);
      }

      const leftBullet = new Bullet(leftGunPos, direction, WeaponType.Basic);
      this.bullets.push(leftBullet);

      const bullet = new Bullet(rightGunPos, direction, WeaponType.Basic);
      this.bullets.push(bullet);
      zzfx(...[, , 537, 0.02, 0.02, 0.22, 1, 1.59, -6.98, 4.97]);
      this.stats.recharged = 0;
    }

    this.wasShot = false;
  }

  update(dt: number) {
    this.stats.recharged += dt;

    this.bullets.forEach((bullet) => {
      bullet.update(dt);
    });
  }
}
