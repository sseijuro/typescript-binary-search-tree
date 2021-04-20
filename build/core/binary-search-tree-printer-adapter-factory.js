"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTreePrinterVisualAdapter = exports.BinarySearchTreePrinterConsoleAdapter = exports.BinarySearchTreePrinterAdapter = exports.BinarySearchTreePrinterAdapterFactory = void 0;
const const_1 = require("./const");
class BinarySearchTreePrinterAdapterFactory {
    create(adapterType) {
        let adapter;
        switch (adapterType) {
            case const_1.AdapterType.ConsoleAdapter:
                adapter = this.createConsoleAdapter();
                break;
            case const_1.AdapterType.VisualAdapter:
                adapter = this.createVisualAdapter();
                break;
            default:
                adapter = null;
                break;
        }
        return adapter;
    }
    createConsoleAdapter() {
        return new BinarySearchTreePrinterConsoleAdapter();
    }
    createVisualAdapter() {
        return new BinarySearchTreePrinterVisualAdapter();
    }
}
exports.BinarySearchTreePrinterAdapterFactory = BinarySearchTreePrinterAdapterFactory;
class BinarySearchTreePrinterAdapter {
    constructor(_type) {
        this._type = _type;
        this._treeDepth = 0;
    }
    setTreeDepth(treeDepth) {
        this._treeDepth = treeDepth;
    }
    getTreeDepth() {
        return this._treeDepth;
    }
    print() {
        throw new Error(const_1.NOT_IMPLEMENTED_METHOD);
    }
    clear() {
        throw new Error(const_1.NOT_IMPLEMENTED_METHOD);
    }
}
exports.BinarySearchTreePrinterAdapter = BinarySearchTreePrinterAdapter;
class BinarySearchTreePrinterConsoleAdapter extends BinarySearchTreePrinterAdapter {
    constructor() {
        super(const_1.AdapterType.ConsoleAdapter);
    }
    print(value = null, x = const_1.X_START, y = const_1.Y_START, depth = 1) {
        console.log(`Value=${value}, x=${x}, y=${y}, depth=${depth}`);
    }
}
exports.BinarySearchTreePrinterConsoleAdapter = BinarySearchTreePrinterConsoleAdapter;
class BinarySearchTreePrinterVisualAdapter extends BinarySearchTreePrinterAdapter {
    constructor() {
        super(const_1.AdapterType.VisualAdapter);
        this._ctx = this.setupContext();
        if (!window) {
            throw new Error(const_1.METHOD_ALLOWED_IN_BROWSER);
        }
    }
    setupContext() {
        let canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = const_1.MAX_CANVAS_WIDTH;
            canvas.height = const_1.MAX_CANVAS_HEIGHT;
            document.body.append(canvas);
        }
        return canvas.getContext("2d");
    }
    clear() {
        if (this._ctx) {
            this._ctx.clearRect(0, 0, const_1.MAX_CANVAS_WIDTH, const_1.MAX_CANVAS_HEIGHT);
        }
    }
    print(value = null, x = const_1.X_START, y = const_1.Y_START, depth = 1) {
        if (this._ctx) {
            this._ctx.font = `${const_1.FONT_SIZE}px serif`;
            this._ctx.fillText(`${value}`, x, y, const_1.MAX_WIDTH);
            this.drawPath(x, y, depth, const_1.PathType.Left);
            this.drawPath(x, y, depth, const_1.PathType.Right);
        }
    }
    drawPath(x, y, depth, type) {
        if (this._ctx) {
            this._ctx.beginPath();
            this._ctx.moveTo(x, y);
            this._ctx.lineWidth = const_1.LINE_WIDTH;
            switch (type) {
                case const_1.PathType.Left:
                    this._ctx.lineTo(x - const_1.X_STEP * const_1.X_COEFF, y + const_1.Y_STEP * depth * const_1.Y_COEFF);
                    break;
                case const_1.PathType.Right:
                    this._ctx.lineTo(x + const_1.X_STEP * const_1.X_COEFF, y + const_1.Y_STEP * depth * const_1.Y_COEFF);
                    break;
                default:
                    break;
            }
            this._ctx.stroke();
        }
    }
}
exports.BinarySearchTreePrinterVisualAdapter = BinarySearchTreePrinterVisualAdapter;
