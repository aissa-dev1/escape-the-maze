import { createStyle } from "../utils/create-style";

interface BoardConfig {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  styles?: Partial<CSSStyleDeclaration>;
}

export class Board {
  private _canvas!: HTMLCanvasElement;
  private _ctx!: CanvasRenderingContext2D;
  private _width = 350;
  private _height = 350;
  readonly styles?: Partial<CSSStyleDeclaration> = undefined;

  constructor(config: BoardConfig) {
    this._canvas = config.canvas;
    if (this._canvas instanceof HTMLCanvasElement) {
      this._ctx = this._canvas.getContext("2d")!;
    }
    this._width = config.width || this._width;
    this._height = config.height || this._height;
    this.styles = config.styles;
  }

  init() {
    this._canvas.width = this.width;
    this._canvas.height = this.height;
    createStyle(this._canvas, this.styles);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d")!;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }
}
