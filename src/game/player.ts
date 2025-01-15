import { MapLayout } from "./map";

interface PlayerConfig {
  x: number;
  y: number;
  size: number;
  color: string;
}

export class Player {
  private _x: number;
  private _y: number;
  private size: number;
  private color: string;

  constructor(config: PlayerConfig) {
    this._x = config.x;
    this._y = config.y;
    this.size = config.size;
    this.color = config.color;
  }

  move(dx: number, dy: number, layout: MapLayout) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    // Check for boundaries and walls (0 is a wall)
    if (
      layout[newY] &&
      layout[newY][newX] !== 0 && // not a wall
      layout[newY][newX] !== null // not null
    ) {
      this._x = newX;
      this._y = newY;
    }
  }

  draw(ctx: CanvasRenderingContext2D, cellSize: number) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * cellSize, this.y * cellSize, this.size, this.size);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
