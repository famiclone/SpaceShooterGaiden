import Person, { Bullet, WeaponType, Stats, weaponTypes } from "./person";
import Renderer from "./renderer";
import state from "./state";
import { isOutOfScreen } from "./utils";
import Vector2 from "./vector2";

export default class Player extends Person {
  stats: Stats = new Stats();
  bullets: Bullet[] = [];
  recharged: number = 0;
  isDisembarked: boolean = false;

  constructor(pos: Vector2) {
    super(pos, "player");
    this.size = new Vector2(16, 16);
    this.pos = pos;
    this.prevPos = pos;
    this.stats.health = 50;
    this.speed = 2;
  }

  move(direction: Vector2) {
    this.prevPos = this.pos.clone();

    this.spriteDirection = direction.clone();

    const newPos = this.pos
      .clone()
      .add(direction.mul(new Vector2(this.speed, this.speed)));

    const distance = 50;

    if (this.isOutOfParent(newPos)) {
      return;
    } else {
      this.pos = newPos;
    }

    if (newPos.x <= distance) {
      this.pos = this.prevPos;
      this.parent!.pos.x += this.speed;
    }

    if (newPos.y <= distance) {
      this.pos = this.prevPos;
      this.parent!.pos.y += this.speed;
    }

    if (
      newPos.clone().add(new Vector2(this.size.x, 0)).x >=
      state.game!.renderer.windowSize.width - 50
    ) {
      this.pos = this.prevPos;
      this.parent!.pos.x -= this.speed;
    }

    if (
      newPos.clone().add(new Vector2(0, this.size.y)).y >=
      state.game!.renderer.windowSize.height - 50
    ) {
      this.pos = this.prevPos;
      this.parent!.pos.y -= this.speed;
    }
  }

  render(renderer: Renderer) {
    let spriteDirection: string = "DOWN";

    if (this.spriteDirection.x > 0) {
      spriteDirection = "RIGHT";
    } else if (this.spriteDirection.x < 0) {
      spriteDirection = "LEFT";
    } else if (this.spriteDirection.y > 0) {
      spriteDirection = "DOWN";
    } else if (this.spriteDirection.y < 0) {
      spriteDirection = "UP";
    }

    if (this.wasShot) {
      if (this.spriteDirection.x > 0) {
        spriteDirection = "RIGHT";
      }
      if (this.spriteDirection.x < 0) {
        spriteDirection = "LEFT";
      }
      if (this.spriteDirection.y > 0) {
        spriteDirection = "DOWN";
      }
      if (this.spriteDirection.y < 0) {
        spriteDirection = "UP";
      }
    }

    renderer.ctx.save();
    renderer.drawSprite(
      renderer.spriteSheetMap[`PLAYER_${spriteDirection}`].x,
      renderer.spriteSheetMap[`PLAYER_${spriteDirection}`].y,
      renderer.spriteSheetMap[`PLAYER_${spriteDirection}`].w,
      renderer.spriteSheetMap[`PLAYER_${spriteDirection}`].h,
      this.pos.x,
      this.pos.y,
      16,
      16
    );

    this.bullets.forEach((bullet) => {
      bullet.render(renderer);
    });

    this.bullets = this.bullets.filter(
      (bullet) =>
        !isOutOfScreen(bullet, renderer.canvas.width, renderer.canvas.height)
    );
    this.debugDraw(renderer);
    renderer.ctx.restore();
  }
}
