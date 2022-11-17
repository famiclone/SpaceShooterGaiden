import AssetLoader from "./assetloader";
import Controller from "./controller";
import GameObject from "./gameobject";
import Logger from "./logger";
import Player from "./player";
import Renderer from "./renderer";
import Scene from "./scene";
import IntroScene from "./scenes/intro-scene";
import state from "./state";
import UIRenderer from "./ui-renderer";
import Vector2 from "./vector2";

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
  uiRenderer: UIRenderer = new UIRenderer();
  assetLoader: AssetLoader = new AssetLoader();
  controller: Controller;
  player: Player;
  scene: GameObject = new Scene();
  currentState: GameState = GameState.LOADING;

  lastTime: number = 0;

  constructor() {
    this.logger = new Logger();
    this.logger.info("Game started");
    this.player = new Player();
    this.controller = new Controller(this);

    // @ts-ignore
    window["game"] = this;
  }

  update(ts: number) {
    const dt = ts - this.lastTime;

    if (this.controller.keyIsDown("KeyW")) {
      this.player.move(new Vector2(0, -1));
    }

    if (this.controller.keyIsDown("KeyA")) {
      this.player.move(new Vector2(-1, 0));
    }

    if (this.controller.keyIsDown("KeyS")) {
      this.player.move(new Vector2(0, 1));
    }

    if (this.controller.keyIsDown("KeyD")) {
      this.player.move(new Vector2(1, 0));
    }

    if (this.controller.keyIsDown("Space")) {
      this.player.fire();
    }

    this.lastTime = ts;

    this.scene.update(dt);
  }

  changeState(state: GameState) {
    this.currentState = state;
  }

  render() {
    this.renderer.clear();
    this.uiRenderer.clear();
    //this.uiRenderer.progress(
    //  this.player.stats.health,
    //  this.renderer.windowSize.width - 28,
    //  8
    //);

    this.scene.render(this.renderer);
  }

  run() {
    this.logger.info("Game running");

    const levelWidth = 512;
    const levelHeight = 512;

    this.scene.size = new Vector2(levelWidth, levelHeight);
    this.scene.pos = new Vector2(-200, -200);

    this.scene.addChild(this.player);

    this.assetLoader
      .load(["assets/spritesheet.png", "assets/spritesheet_map.json"])
      .then(() => {
        this.logger.info("Assets loaded");

        this.renderer.image = this.assetLoader.list[
          "spritesheet"
        ] as HTMLImageElement;

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
