import { Board } from "./board";
import { Player } from "./player";

export type MapCell = number | null;
export type MapLayout = MapCell[][];

interface MapConfig {
  board: Board;
}

export class Map {
  private _layout: MapLayout = [[null, null, null, null, null]];
  private cellSize: number;
  private board: Board;
  private _player: Player;

  constructor(config: MapConfig) {
    this.board = config.board;
    this.cellSize = Math.round(this.board.width / this.layout[0].length);
    this._player = new Player({
      x: this.randomPlayerX(),
      y: this.randomPlayerY(),
      size: this.cellSize,
      color: "#3498db",
    });
  }

  draw() {
    this.drawMaze();
    this.player.draw(this.board.ctx, this.cellSize);
  }

  update() {}

  changeLayout(layout: MapLayout) {
    this._layout = layout;
    this.cellSize = Math.round(this.board.width / this.layout[0].length);
    this._player = new Player({
      x: this.randomPlayerX(),
      y: this.randomPlayerY(),
      size: this.cellSize,
      color: "#2c3e50",
    });
  }

  private drawMaze() {
    for (let row = 0; row < this.layout.length; row++) {
      for (let col = 0; col < this.layout[row].length; col++) {
        const cell = this.layout[row][col];

        if (cell === null) {
          this.board.ctx.fillStyle =
            this.board.styles?.backgroundColor || "#1a1a1a";
        }
        if (cell === 0) {
          this.board.ctx.fillStyle = "#1a1a1a";
        }
        if (cell === 1) {
          this.board.ctx.fillStyle = "#ecf0f1";
        }
        if (cell === 2) {
          this.board.ctx.fillStyle = "#2ecc71";
        }

        this.board.ctx.fillRect(
          col * this.cellSize,
          row * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  private randomPlayerX(): number {
    return 1;
  }

  private randomPlayerY(): number {
    return 1;
  }

  get layout(): MapLayout {
    return this._layout;
  }

  get player(): Player {
    return this._player;
  }
}
