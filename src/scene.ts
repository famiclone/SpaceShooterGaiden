import GameObject from "./gameobject";
import Player from "./player";
import Renderer from "./renderer";
import state from "./state";
import Vector2 from "./vector2";

const tiles = [
  {
    id: "grass",
    collision: false,
  },
  {
    id: "grass2",
    coliision: false,
  },
  {
    id: "grass3",
    collision: true,
  },
];

export default class Scene extends GameObject {
  map: number[] = [];

  constructor(levelData: any, public player: Player) {
    super();
    this.size = levelData.size;
    this.pos = levelData.pos;
    this.map = levelData.map()

    this.addChild(player);

    this.map.forEach((_, i) => {
      this.map[i] = Math.trunc(Math.random() * tiles.length);
    });
  }

  getTile(pos: Vector2) {
    const tileSize = 8;
    const x = Math.trunc(pos.x / tileSize);
    const y = Math.trunc(pos.y / tileSize);

    const tile = this.map[x + y * (this.size.x / tileSize)];

    if (tile) {
      return tiles[tile];
    }
  }

  update(dt: number): void {
    // collide player with map
    if (this.getTile(this.player.pos)?.collision) {
      state.moveDisabled = false;
    } else {
      state.moveDisabled = false;
    }

    // check if child is visible
    if (
      this.pos.x + this.size.x < 0 ||
      this.pos.y + this.size.y < 0 ||
      this.pos.x > state.windowResolution.width ||
      this.pos.y > state.windowResolution.height
    ) {
      return;
    }

    this.children.forEach((child) => {
      child.update(dt);
    });
  }

  renderMap(renderer: Renderer) {
    const tileSize = 16;

    // layer 1
    for (let x = 0; x < this.size.x / tileSize; x++) {
      for (let y = 0; y < this.size.y / tileSize; y++) {
        const tile = tiles[this.map[x + y * (this.size.x / tileSize)]];

        // check if tile is visible
        if (
          x * tileSize + this.pos.x > state.windowResolution.width ||
          y * tileSize + this.pos.y > state.windowResolution.height ||
          x * tileSize + this.pos.x + tileSize < 0 ||
          y * tileSize + this.pos.y + tileSize < 0
        ) {
          continue;
        }

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
