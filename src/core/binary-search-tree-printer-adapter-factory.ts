import {
    AdapterType,
    FONT_SIZE, LINE_WIDTH,
    MAX_CANVAS_HEIGHT,
    MAX_CANVAS_WIDTH,
    MAX_WIDTH,
    METHOD_ALLOWED_IN_BROWSER,
    NOT_IMPLEMENTED_METHOD,
    PathType,
    X_COEFF,
    X_START,
    X_STEP,
    Y_COEFF,
    Y_START,
    Y_STEP,
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

    public createVisualAdapter(): BinarySearchTreePrinterVisualAdapter<T> {
        return new BinarySearchTreePrinterVisualAdapter<T>();
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
}

export class BinarySearchTreePrinterConsoleAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    constructor() {
        super(AdapterType.ConsoleAdapter);
    }

    print(value: T | null = null, x: number = X_START, y: number = Y_START, depth: number = 1): void {
        console.log(`Value=${value}, x=${x}, y=${y}, depth=${depth}`);
    }
}

export class BinarySearchTreePrinterVisualAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    private readonly _ctx: CanvasRenderingContext2D | null = this.setupContext();

    constructor() {
        super(AdapterType.VisualAdapter);
        if (!window) {
            throw new Error(METHOD_ALLOWED_IN_BROWSER);
        }
    }

    setupContext(): CanvasRenderingContext2D | null {
        let canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = MAX_CANVAS_WIDTH;
            canvas.height = MAX_CANVAS_HEIGHT;
            document.body.append(canvas);
        }
        return canvas.getContext("2d");
    }

    clear(): void {
        if (this._ctx) {
            this._ctx.clearRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
        }
    }

    print(value: T | null = null, x: number = X_START, y: number = Y_START, depth: number = 1): void {
        if (this._ctx) {
            this._ctx.font = `${FONT_SIZE}px serif`;
            this._ctx.fillText(`${value}`, x, y, MAX_WIDTH);

            this.drawPath(x, y, depth, PathType.Left);
            this.drawPath(x, y, depth, PathType.Right);

        }
    }

    drawPath(x: number, y: number, depth: number, type: PathType): void {
        if (this._ctx) {
            this._ctx.beginPath();
            this._ctx.moveTo(x, y);
            this._ctx.lineWidth = LINE_WIDTH;
            switch (type) {
                case PathType.Left:
                    this._ctx.lineTo(x - X_STEP * X_COEFF, y + Y_STEP * depth * Y_COEFF);
                    break;
                case PathType.Right:
                    this._ctx.lineTo(x + X_STEP * X_COEFF, y + Y_STEP * depth * Y_COEFF);
                    break;
                default:
                    break;
            }
            this._ctx.stroke();
        }
    }

}
