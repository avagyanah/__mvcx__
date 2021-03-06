//
// tslint:disable-next-line
/// <reference path="../typings/pixi.js.d.ts" />
// tslint:disable-next-line
import * as PIXI from 'pixi.js';
import { gameConfig } from './constants/GameConfig';
import { IGame, IGameConfig, ISceneManager } from './constants/Types';
import ScaleManager from './utils/ScaleManager';
import { PreloadScene } from './view/scenes/PreloadScene';
import SceneManager from './view/scenes/SceneManager';
import { GameFacade } from './GameFacade';
import { GameScene } from './view/scenes/GameScene';

export class TTTGame extends PIXI.Application implements IGame {
  public config: IGameConfig = gameConfig;
  public sceneManager: ISceneManager;
  public scaleManager: ScaleManager;

  constructor(config: IGameConfig) {
    super(config);
    this.config = config;

    //
    this.prepareView();
    this.prepareScenes();
  }

  private prepareScenes(): void {
    this.sceneManager = new SceneManager(this);
    this.sceneManager.add(PreloadScene);
    this.sceneManager.add(GameScene);
    this.sceneManager.start(PreloadScene.name);
  }

  private prepareView(): void {
    this.scaleManager = new ScaleManager(
      this.view,
      this.config.width,
      this.config.height,
    );
    document.body.appendChild(this.view);
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    window.TTT = new TTTGame(gameConfig);
    GameFacade.Instance.initialize(true);
  }
};
