import Game from "./game";
import Level from "./level";
import Renderer from "./renderer";
import UIRenderer from "./ui-renderer";
import Vector2 from "./vector2";
import { zzfx } from "zzfx";
import { PersonAction } from "./person";

export class BaseState {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  update(dt: number) {}
  render(renderer: Renderer) {}
  renderUI(uiRenderer: UIRenderer) {}
}

export class IntroState extends BaseState {
  constructor(game: Game) {
    super(game);
  }
  public update(dt: number) {
    if (this.game.controller.keyIsDown("Enter")) {
      this.game.stateStack.pop();
      this.game.stateStack.push(
        new FadeState(this.game, { r: 0, g: 0, b: 0 }, 1000)
      );
    }
  }
  public render() {
    this.game.uiRenderer.text("SPACE SHOOTER GAIDEN", 45, 30);
    this.game.uiRenderer.text("PRESS ENTER", 80, 120, true);

    this.game.uiRenderer.text("WASD - MOVE, IJKL - FIRE", 30, 220);
  }
}

export class LoadingState extends BaseState {
  loaded: boolean = false;
  constructor(game: Game) {
    super(game);
  }
  public update(dt: number) {
    if (this.game.assetLoader.list) {
      this.loaded = true;
    }

    if (this.loaded) {
      this.game.stateStack.pop();
      this.game.stateStack.push(new PlayingState(this.game));
    }
  }

  public render() {
    this.game.uiRenderer.text("LOADING...", 80, 120, true);
  }
}

export class FadeState extends BaseState {
  lastTime: number = 0;
  aplha: number = 0;

  constructor(
    game: Game,
    private color: { r: number; g: number; b: number },
    private time: number
  ) {
    super(game);
  }
  public update(dt: number) {
    this.lastTime += dt;

    if (this.lastTime > this.time) {
      zzfx(
        ...[
          1.66,
          ,
          322,
          0.05,
          0.24,
          0.19,
          ,
          0.5,
          ,
          -22,
          935,
          0.41,
          0.35,
          0.1,
          ,
          ,
          0.22,
          0.77,
        ]
      );
    }

    // Fade in
    if (this.lastTime > this.time / 3) {
      this.aplha = 1;
    } else {
      this.aplha = this.lastTime / (this.time / 3);
    }

    // Fade out
    if (this.lastTime > (this.time / 3) * 2) {
      this.aplha = 1 - (this.lastTime - (this.time / 3) * 2) / (this.time / 3);
    }

    if (this.lastTime > this.time) {
      this.game.stateStack.pop();
      this.game.stateStack.push(new PlayingState(this.game));
    }
  }
  public render() {
    this.game.renderer.ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.aplha})`;
    this.game.renderer.ctx.fillRect(
      0,
      0,
      this.game.renderer.windowSize.width,
      this.game.renderer.windowSize.height
    );
  }
}

export class MenuState extends BaseState {
  constructor(game: Game) {
    super(game);
  }
  public update(dt: number) {
    if (this.game.controller.keyIsDown("Escape")) {
      this.game.stateStack.pop();
    }
  }
  public render() {
    this.game.uiRenderer.text("MENU", 80, 30);
  }
}

export class PlayingState extends BaseState {
  level: Level = new Level();
  renderer: Renderer = new Renderer();
  uiRenderer: UIRenderer = new UIRenderer();

  constructor(game: Game) {
    super(game);
  }

  public update(dt: number) {
    if (this.game.controller.keyIsDown("KeyA")) {
      this.level.player.move(new Vector2(-1, 0));
    }

    if (this.game.controller.keyIsDown("KeyD")) {
      this.level.player.move(new Vector2(1, 0));
    }

    if (this.game.controller.keyIsDown("KeyW")) {
      this.level.player.move(new Vector2(0, -1));
    }

    if (this.game.controller.keyIsDown("KeyS")) {
      this.level.player.move(new Vector2(0, 1));
    }

    if (this.game.controller.keyIsDown("KeyI")) {
      this.level.player.fire(new Vector2(0, -1), dt);
    }

    if (this.game.controller.keyIsDown("KeyJ")) {
      this.level.player.fire(new Vector2(-1, 0), dt);
    }

    if (this.game.controller.keyIsDown("KeyK")) {
      this.level.player.fire(new Vector2(0, 1), dt);
    }

    if (this.game.controller.keyIsDown("KeyL")) {
      this.level.player.fire(new Vector2(1, 0), dt);
    }

    if (this.game.controller.keyIsDown("Escape")) {
      this.game.stateStack.push(new MenuState(this.game));
    }

    if (
      !this.game.controller.keyIsDown("KeyW") &&
      !this.game.controller.keyIsDown("KeyS") &&
      !this.game.controller.keyIsDown("KeyA") &&
      !this.game.controller.keyIsDown("KeyD")) {
      this.level.player.action = PersonAction.IDLE
    }

    this.level.update(dt);
  }
  public render(renderer: Renderer) {
    this.game.uiRenderer.progress(
      this.level.player.stats.health,
      this.game.renderer.windowSize.width - 28,
      8
    );

    this.level.render(this.game.renderer);
  }
}

export default class StateStack {
  states: any = [];

  clear() {
    this.states = [];
  }

  update(dt: number) {
    if (this.states.length === 0) {
      return;
    }

    this.states.at(-1).update(dt);
  }

  render(renderer: Renderer) {
    this.states.forEach((state: any) => {
      state.render(renderer);
    });
  }

  push(state: any) {
    this.states.push(state);
  }

  pop() {
    this.states.pop();
  }
}
