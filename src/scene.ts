import GameObject from "./gameobject";
import Player from "./player";
import Renderer from "./renderer";
import Vector2 from "./vector2";

const tiles = [
  {
    id: "grass",
  },
  {
    id: "grass2",
  }
];

export default class Scene extends GameObject {
  player: Player | null = null;
  map: number[] = [];

  constructor(levelData: any) {
    super();
    this.size = levelData.size;
    this.pos = levelData.pos;
    //this.map = levelData.map;
    this.map = Array(levelData.size.x * levelData.size.y).fill(0);

    this.map.forEach((_, i) => {
      this.map[i] = Math.trunc(Math.random() * tiles.length);
    });
  }

  renderMap(renderer: Renderer) {
    const tileSize = 16;

    for (let x = 0; x < this.size.x / tileSize; x++) {
      for (let y = 0; y < this.size.y / tileSize; y++) {
        const tile = tiles[this.map[x + y * (this.size.x / tileSize)]];

        renderer.drawTile(
          tile.id,
          new Vector2(this.pos.x + x * tileSize, this.pos.y + y * tileSize)
        );
      }
    }
  }

  render(renderer: Renderer): void {
    this.renderMap(renderer);

    this.player?.render(renderer);

    this.children.forEach((child) => {
      child.render(renderer);
    });

    this.debugDraw(renderer);
  }
}
