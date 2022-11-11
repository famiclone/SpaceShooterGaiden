class Logger {
  error(message: string) {
    console.error(message);
  }

  warn(message: string) {
    console.warn(message);
  }

  info(message: string) {
    console.info("ℹ️ " + message);
  }

  debug(message: string) {
    console.log("📝 " + message);
  }
}

class Renderer {
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

class Game {
  logger: Logger;
  renderer: Renderer;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");

    this.renderer = new Renderer();

    this.loop();
  }

  update() {}

  render() {
    this.renderer.render();
  }

  loop() {
    this.update();
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}

const game = new Game();
