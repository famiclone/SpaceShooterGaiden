import AssetLoader from "./assetloader";
import Controller from "./controller";
import Level from "./level";
import Logger from "./logger";
import Renderer from "./renderer";
import StateStack, {
  IntroState,
  LoadingState,
  PlayingState,
} from "./state-stack";
import UIRenderer from "./ui-renderer";
import state from "./state";

export default class Game {
  logger: Logger;
  renderer: Renderer;
  uiRenderer: UIRenderer;
  assetLoader: AssetLoader;
  controller: Controller;
  stateStack: StateStack;

  lastTime: number = 0;

  constructor() {
    this.setTitle("SpaceShooterGaiden");

    this.logger = new Logger();
    this.controller = new Controller();
    this.stateStack = new StateStack();
    this.renderer = new Renderer();
    this.uiRenderer = new UIRenderer();
    this.assetLoader = new AssetLoader();

    // @ts-ignore
    window["game"] = this;
  }

  update(ts: number) {
    const dt = ts - this.lastTime;
    this.lastTime = ts;

    this.stateStack.update(dt);
  }

  setTitle(title: string) {
    document.title = title;
  }

  render() {
    this.renderer.clear();
    this.uiRenderer.clear();

    this.stateStack.render(this.renderer);
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

        this.stateStack.push(new IntroState(this));

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
