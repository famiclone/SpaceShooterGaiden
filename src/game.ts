import  AssetLoader  from "./assetloader";
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
  renderer: Renderer = new Renderer();
  assetLoader: AssetLoader = new AssetLoader();

  lastTime: number = 0;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");

    // @ts-ignore
    window["game"] = this;
  }

  update(ts: number) {
    const dt = ts - this.lastTime;

    this.lastTime = ts;
  }

  render() {
    this.renderer.drawText(
      "SPACE SHOOTER GAIDEN V0.1",
      this.assetLoader.list["spritesheet"] as HTMLImageElement,
      this.assetLoader.list["spritesheet_map"]
    );
  }

  run() {
    this.logger.info("Game running");

    this.assetLoader
      .load(["assets/spritesheet.png", "assets/spritesheet_map.json"])
      .then(() => {
        this.logger.info("Assets loaded");

        this.loop();
      });
  }

  loop() {
    this.update(performance.now());
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}
