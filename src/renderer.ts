import Logger from "./logger";

export default class Renderer {
  logger: Logger = new Logger();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  windowSize: { width: number; height: number } = { width: 256, height: 240 };

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

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
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.clear();

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, 8, 8);
  }
}
