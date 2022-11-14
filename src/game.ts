import AssetLoader from "./assetloader";
import Controller from "./controller";
import Logger from "./logger";
import Player from "./player";
import Renderer from "./renderer";

enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
  OPTIONS,
  LOADING,
  FLYING,
  DISEMBARK,
}

export default class Game {
  logger: Logger;
  renderer: Renderer = new Renderer();
  assetLoader: AssetLoader = new AssetLoader();
  controller: Controller;

  player: Player;

  lastTime: number = 0;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");
    this.player = new Player();
    this.controller = new Controller(this.player);

    // @ts-ignore
    window["game"] = this;
  }

  update(ts: number) {
    const dt = ts - this.lastTime;

    this.lastTime = ts;

    this.player.update(dt);
  }

  render() {
    this.renderer.clear();

    //this.renderer.drawText(
    //  "SPACE SHOOTER GAIDEN V0.1",
    //  this.assetLoader.list["spritesheet"] as HTMLImageElement,
    //  this.assetLoader.list["spritesheet_map"]
    //);

    this.player.render(this.renderer);
  }

  run() {
    this.logger.info("Game running");

    this.assetLoader
      .load(["assets/spritesheet.png", "assets/spritesheet_map.json"])
      .then(() => {
        this.logger.info("Assets loaded");

        this.renderer.image = this.assetLoader.list[
          "spritesheet"
        ] as HTMLImageElement;

        this.loop();
      });
  }

  loop() {
    this.update(performance.now());
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}
