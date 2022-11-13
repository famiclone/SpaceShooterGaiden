import Vector2 from "./vector2";

export default class GameObject {
  pos: Vector2 = new Vector2(0, 0);
  vel: Vector2 = new Vector2(0, 0);
  size: Vector2 = new Vector2(8, 8);
  rotation: number = 0;
  speed: number = 1;

  constructor() {}
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
