import { BinarySearchTreePrinterVisualAdapterZoom } from "./binary-search-tree-printer-visual-adapter-zoom";
import {
    AdapterType,
    FONT_SIZE, LINE_WIDTH,
    MAX_CANVAS_HEIGHT,
    MAX_CANVAS_WIDTH,
    METHOD_ALLOWED_IN_BROWSER,
    NOT_IMPLEMENTED_METHOD,
    RECT_COLOR, RECT_SIZE,
    X_START,
    Y_START,
} from "./const";

export interface IBinarySearchTreePrinterAdapterFactory<T> {
    createConsoleAdapter(): BinarySearchTreePrinterConsoleAdapter<T>;

    createVisualAdapter(): BinarySearchTreePrinterVisualAdapter<T>;
}

export interface IBinarySearchTreePrinterAdapter<T> {
    setTreeDepth(treeDepth: number): void;

    print(value: T | null, depth: number, parent: T | null): void;

    getTreeDepth(): void;
}

export class BinarySearchTreePrinterAdapterFactory<T> implements IBinarySearchTreePrinterAdapterFactory<T> {

    public create(adapterType: AdapterType): BinarySearchTreePrinterAdapter<T> | BinarySearchTreePrinterConsoleAdapter<T> | BinarySearchTreePrinterVisualAdapter<T> | null {
        let adapter: BinarySearchTreePrinterAdapter<T> | BinarySearchTreePrinterConsoleAdapter<T> | BinarySearchTreePrinterVisualAdapter<T> | null;
        switch (adapterType) {
            case AdapterType.ConsoleAdapter:
                adapter = this.createConsoleAdapter();
                break;
            case AdapterType.VisualAdapter:
                adapter = this.createVisualAdapter();
                break;
            default:
                adapter = null;
                break;
        }
        return adapter;
    }

    public createConsoleAdapter(): BinarySearchTreePrinterConsoleAdapter<T> {
        return new BinarySearchTreePrinterConsoleAdapter<T>();
    }

    public createVisualAdapter(_zoom: BinarySearchTreePrinterVisualAdapterZoom | null = null): BinarySearchTreePrinterVisualAdapter<T> {
        return new BinarySearchTreePrinterVisualAdapter<T>(_zoom);
    }
}

export class BinarySearchTreePrinterAdapter<T> implements IBinarySearchTreePrinterAdapter<T> {
    protected _treeDepth: number;

    constructor(private readonly _type: AdapterType) {
        this._treeDepth = 0;
    }

    public setTreeDepth(treeDepth: number): void {
        this._treeDepth = treeDepth;
    }

    public getTreeDepth(): number {
        return this._treeDepth;
    }

    public print(): void {
        throw new Error(NOT_IMPLEMENTED_METHOD);
    }

    public clear(): void {
        throw new Error(NOT_IMPLEMENTED_METHOD);
    }

    public getZoom(): BinarySearchTreePrinterVisualAdapterZoom | null {
        throw new Error(NOT_IMPLEMENTED_METHOD);
    }
}

export class BinarySearchTreePrinterConsoleAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    constructor() {
        super(AdapterType.ConsoleAdapter);
    }

    print(value: T | null = null, x: number = X_START, y: number = Y_START, prevX: number = 0, prevY: number = 0, depth: number = 1): void {
        console.log(`Value=${value}, x=${x}, y=${y}, prevX=${prevX}, prevY=${prevY}, depth=${depth}`);
    }
}

export class BinarySearchTreePrinterVisualAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    private _ctx: CanvasRenderingContext2D | null = null;

    constructor(private _zoom: BinarySearchTreePrinterVisualAdapterZoom | null = null) {
        super(AdapterType.VisualAdapter);
        if (!window) {
            throw new Error(METHOD_ALLOWED_IN_BROWSER);
        }
        this.setupContext();
    }

    public getZoom(): BinarySearchTreePrinterVisualAdapterZoom | null {
        return this._zoom;
    }

    setupContext(): void {
        let canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas) {
            canvas = document.createElement("canvas");
            document.body.append(canvas);
        }
        canvas.width = MAX_CANVAS_WIDTH;
        canvas.height = MAX_CANVAS_HEIGHT;
        this._ctx = canvas.getContext("2d");
    }

    clear(): void {
        if (this._ctx) {
            this._ctx.clearRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
        }
    }

    print(value: T | null = null,
          x: number = X_START,
          y: number = Y_START,
          prevX: number = 0, prevY: number = 0, depth: number = 1): void {
        if (this._zoom) {
            if (x === X_START && y === Y_START) {
                this.draw(value,
                    this._zoom.getXstartScaled(),
                    this._zoom.getYstartScaled(),
                    prevX, prevY, depth);
            } else {
                this.draw(value, x, y, prevX, prevY, depth);
            }
        }
        console.log(`depth=${depth}, value=${value}, x=${x}, y=${y}, prevX=${prevX}, prevY=${prevY}, X_START=[${this._zoom?.X_START_SCALED},${X_START}], Y_START=${this._zoom?.Y_START_SCALED},${Y_START}`);
    }

    draw(value: T | null, x: number, y: number, prevX: number, prevY: number, depth: number, scale: number = 1): void {
        if (this._ctx) {
            const digits = `${value}`.length;
            const diff = digits > 2 ? (digits - 2) * 1.5 : 0;
            const fontSize = (FONT_SIZE - diff) * scale;
            this._ctx.font = `${this._zoom ? this._zoom.ify(fontSize) : fontSize}px serif`;
            this._ctx.fillStyle = `${RECT_COLOR}`;
            this._ctx.fillRect(
                this._zoom ? this._zoom.Xify(x) : x,
                this._zoom ? this._zoom.Yify(y) : y,
                this._zoom ? this._zoom.ify(RECT_SIZE) : RECT_SIZE,
                this._zoom ? this._zoom.ify(RECT_SIZE) : RECT_SIZE);
            const textX = !diff ? x + FONT_SIZE * .5 : x;
            const textY = y + FONT_SIZE * 1.25;
            this._ctx.strokeText(`${value}`,
                this._zoom ? this._zoom.Xify(textX) : textX,
                this._zoom ? this._zoom.Yify(textY) : textY);

            if (prevX && prevY && depth > 2) {
                this.drawPath(
                    this._zoom ? this._zoom.Xify(prevX) : prevX,
                    this._zoom ? this._zoom.Yify(prevY + RECT_SIZE) : prevY + RECT_SIZE,
                    this._zoom ? this._zoom.Xify(x) : x,
                    this._zoom ? this._zoom.Yify(y) : y,
                );
            }
        }
    }

    drawPath(x1: number, y1: number, x2: number, y2: number): void {
        if (this._ctx) {
            this._ctx.beginPath();
            this._ctx.moveTo(x1, y1);
            this._ctx.lineWidth = LINE_WIDTH;
            this._ctx.lineTo(x2, y2);
            this._ctx.stroke();
        }
    }

}
