import Logger from "./logger";
import state from "./state";
import Vector2 from "./vector2";

export default class Renderer {
  logger: Logger = new Logger();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement = new Image();
  windowSize: { width: number; height: number } = {
    width: state.windowResolution.width,
    height: state.windowResolution.height,
  };
  spriteSheetMap: {
    [key: string]: { x: number; y: number; w: number; h: number };
  } = {};

  constructor() {
    this.canvas = document.createElement("canvas");
    //this.canvas.width = window.innerWidth;
    //this.canvas.height = window.innerHeight;
    this.canvas.width = 255 * 2;
    this.canvas.height = 240 * 2;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;

    this.ctx.scale(
      this.canvas.width / this.windowSize.width,
      this.canvas.height / this.windowSize.height
    );

    (document.querySelector("#main") as HTMLElement).append(this.canvas);

    this.logger.info("Renderer initialized");

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = 255 * 2
    this.canvas.height = 240 * 2

    this.ctx.scale(
      this.canvas.width / this.windowSize.width,
      this.canvas.height / this.windowSize.height
    );

    this.ctx.imageSmoothingEnabled = false;
  }

  drawTile(id: string, pos: Vector2) {
    const { x, y, w, h } = this.spriteSheetMap[id];
    this.drawSprite(x, y, w, h, pos.x, pos.y, w + 1, h + 1);
  }

  drawSprite(
    tileX: number,
    tileY: number,
    w: number,
    h: number,
    x: number,
    y: number,
    sizeX: number,
    sizeY: number
  ) {
    this.ctx.drawImage(this.image, tileX, tileY, w, h, x, y, sizeX, sizeY);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
