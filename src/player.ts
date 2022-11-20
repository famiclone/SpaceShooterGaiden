import { GameState } from "./game";
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
    this.stats.health = 50;
    this.speed = 2;
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

    if (this.isOutOfParent(newPos)) {
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

  render(renderer: Renderer) {
    renderer.ctx.save();
    renderer.drawSprite(0, 24, 16, 16, this.pos.x, this.pos.y, 16, 16);

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
