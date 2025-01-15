import { createStyle } from "../utils/create-style";

interface BoardConfig {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  styles?: Partial<CSSStyleDeclaration>;
}

export class Board {
  readonly canvas!: HTMLCanvasElement;
  readonly ctx!: CanvasRenderingContext2D;
  private _width = 350;
  private _height = 350;
  readonly styles?: Partial<CSSStyleDeclaration> = undefined;

  constructor(config: BoardConfig) {
    this.canvas = config.canvas;
    if (this.canvas instanceof HTMLCanvasElement) {
      this.ctx = this.canvas.getContext("2d")!;
    }
    this._width = config.width || this._width;
    this._height = config.height || this._height;
    this.styles = config.styles;
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    createStyle(this.canvas, this.styles);
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}
