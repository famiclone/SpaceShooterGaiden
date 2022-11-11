import Logger from "./logger";
import Renderer from "./renderer";

enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
  OPTIONS,
  LOADING,
}

export default class Game {
  logger: Logger;
  renderer: Renderer;
  lastTime: number = 0;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");

    this.renderer = new Renderer();
  }

  update(ts: number) {
    const dt = ts - this.lastTime;

    this.lastTime = ts;

  }

  render() {}

  run() {
    this.logger.info("Game running");

    this.loop();
  }

  loop() {
    this.update(performance.now());
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}
