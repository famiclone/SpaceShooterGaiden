import Logger from "./logger";

export default class Renderer {
  logger: Logger = new Logger();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement = new Image();
  windowSize: { width: number; height: number } = {
    width: 256,
    height: 240,
  };

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx.scale(
      this.canvas.width / this.windowSize.width,
      this.canvas.height / this.windowSize.height
    );

    this.ctx.imageSmoothingEnabled = false;
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
    this.ctx.drawImage(
      this.image,
      tileX,
      tileY,
      w,
      h,
      x,
      y,
      sizeX,
      sizeY
    );
  }

  drawText(text: string, spriteSheet: HTMLImageElement, spriteSheetMap: any) {
    text.split("").forEach((char: string, index: number) => {
      this.ctx.drawImage(
        spriteSheet,
        spriteSheetMap[char].x,
        spriteSheetMap[char].y,
        spriteSheetMap[char].w,
        spriteSheetMap[char].h,
        index * 8,
        0,
        8,
        8
      );
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
