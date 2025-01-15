import { STAGES } from "../data/stages";
import { Board } from "./board";
import { Map, MapLayout } from "./map";

interface GameConfig {
  board: Board;
  map: Map;
}

export class Game {
  private board: Board;
  private map: Map;
  private stages: MapLayout[] = STAGES;
  private currentStage = 0;
  private _gameOver = false;

  constructor(config: GameConfig) {
    this.board = config.board;
    this.map = config.map;
  }

  init() {
    if (!(this.board.canvas instanceof HTMLCanvasElement)) {
      return;
    }

    this.board.init();
    this.map.changeLayout(this.stages[this.currentStage]);

    window.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  nextStage() {
    if (this.currentStage < this.stages.length - 1) {
      this.currentStage++;
      this.map.changeLayout(this.stages[this.currentStage]);
    } else {
      this._gameOver = true;
    }
  }

  draw() {
    this.board.ctx.clearRect(0, 0, this.board.width, this.board.height);
    this.map.draw();
  }

  update() {
    this.map.update();
    this.checkForStageCompletion();
  }

  private checkForStageCompletion() {
    if (this.map.layout[this.map.player.y][this.map.player.x] === 2) {
      this.nextStage();
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      this.map.player.move(0, -1, this.map.layout);
    }
    if (e.key === "ArrowDown") {
      this.map.player.move(0, 1, this.map.layout);
    }
    if (e.key === "ArrowLeft") {
      this.map.player.move(-1, 0, this.map.layout);
    }
    if (e.key === "ArrowRight") {
      this.map.player.move(1, 0, this.map.layout);
    }
  }

  get gameOver(): boolean {
    return this._gameOver;
  }
}
