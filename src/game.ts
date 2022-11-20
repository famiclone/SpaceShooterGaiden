import AssetLoader from "./assetloader";
import Controller from "./controller";
import Level from "./level";
import Logger from "./logger";
import Renderer from "./renderer";
import state from "./state";
import UIRenderer from "./ui-renderer";
import Vector2 from "./vector2";

export enum GameState {
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
  uiRenderer: UIRenderer = new UIRenderer();
  assetLoader: AssetLoader = new AssetLoader();
  controller: Controller;
  level: Level = new Level();
  currentState: GameState = GameState.DISEMBARK

  lastTime: number = 0;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");
    this.controller = new Controller(this);

    // @ts-ignore
    window["game"] = this;
  }

  update(ts: number) {
    const dt = ts - this.lastTime;

    if (this.currentState === GameState.FLYING) {
      this.level.player.move(new Vector2(0, -1));

      if (this.controller.keyIsDown("KeyA")) {
        this.level.player.move(new Vector2(-1, 0));
      }

      if (this.controller.keyIsDown("KeyD")) {
        this.level.player.move(new Vector2(1, 0));
      }

      if (this.controller.keyIsDown("Space")) {
        this.level.player.fire(new Vector2(0, -1), dt);
      }

      return false;
    }
    if (this.controller.keyIsDown("KeyA")) {
      this.level.player.move(new Vector2(-1, 0));
    }

    if (this.controller.keyIsDown("KeyD")) {
      this.level.player.move(new Vector2(1, 0));
    }

    if (this.controller.keyIsDown("KeyW")) {
      this.level.player.move(new Vector2(0, -1));
    }

    if (this.controller.keyIsDown("KeyS")) {
      this.level.player.move(new Vector2(0, 1));
    }

    if (this.controller.keyIsDown("KeyI")) {
      this.level.player.fire(new Vector2(0, -1), dt);
    }

    if (this.controller.keyIsDown("KeyJ")) {
      this.level.player.fire(new Vector2(-1, 0), dt);
    }

    if (this.controller.keyIsDown("KeyK")) {
      this.level.player.fire(new Vector2(0, 1), dt);
    }

    if (this.controller.keyIsDown("KeyL")) {
      this.level.player.fire(new Vector2(1, 0), dt);
    }

    this.lastTime = ts;

    this.level.update(dt);
  }

  changeState(state: GameState) {
    this.currentState = state;
  }

  render() {
    this.renderer.clear();
    this.uiRenderer.clear();
    this.uiRenderer.progress(
      this.level.player.stats.health,
      this.renderer.windowSize.width - 28,
      8
    );

    this.level.render(this.renderer);
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

        this.renderer.spriteSheetMap = this.assetLoader.list[
          "spritesheet_map"
        ] as any;

        this.uiRenderer.image = this.assetLoader.list[
          "spritesheet"
        ] as HTMLImageElement;

        this.uiRenderer.spriteSheetMap = this.assetLoader.list[
          "spritesheet_map"
        ] as any;

        state.game = this;

        this.loop();
      });
  }

  loop() {
    this.update(performance.now());
    this.render();

    requestAnimationFrame(() => this.loop());
  }
}
