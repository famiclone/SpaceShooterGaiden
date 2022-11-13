export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  sub(v: Vector2) {
    this.x -= v.x;
    this.y -= v.y;
    
    return this;
  }

  mul(v: Vector2) {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  div(v: Vector2) {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  reset() {
    this.x = 0;
    this.y = 0;

    return this;
  }
}
