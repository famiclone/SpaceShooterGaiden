import GameObject from "./gameobject";

export function isCollide(a: GameObject, b: GameObject): boolean {
  return (
    a.pos.x < b.pos.x + b.size.x &&
    a.pos.x + a.size.x > b.pos.x &&
    a.pos.y < b.pos.y + b.size.y &&
    a.pos.y + a.size.y > b.pos.y
  );
}

export function isOutOfScreen(obj: GameObject, width: number, height: number) {
  return (
    obj.pos.x < 0 ||
    obj.pos.x > width ||
    obj.pos.y < 0 ||
    obj.pos.y > height
  );
}
