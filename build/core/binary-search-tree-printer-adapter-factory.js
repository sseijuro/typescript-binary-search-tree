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
    print(value = null, x = const_1.X_START, y = const_1.Y_START, prevX = 0, prevY = 0, depth = 1) {
        console.log(`Value=${value}, x=${x}, y=${y}, prevX=${prevX}, prevY=${prevY}, depth=${depth}`);
    }
}
exports.BinarySearchTreePrinterConsoleAdapter = BinarySearchTreePrinterConsoleAdapter;
class BinarySearchTreePrinterVisualAdapter extends BinarySearchTreePrinterAdapter {
    constructor() {
        super(const_1.AdapterType.VisualAdapter);
        this._ctx = null;
        if (!window) {
            throw new Error(const_1.METHOD_ALLOWED_IN_BROWSER);
        }
        this.setupContext();
    }
    setupContext() {
        let canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.width = const_1.MAX_CANVAS_WIDTH;
            canvas.height = const_1.MAX_CANVAS_HEIGHT;
            document.body.append(canvas);
        }
        this._ctx = canvas.getContext("2d");
    }
    clear() {
        if (this._ctx) {
            this._ctx.clearRect(0, 0, const_1.MAX_CANVAS_WIDTH, const_1.MAX_CANVAS_HEIGHT);
        }
    }
    print(value = null, x = const_1.X_START, y = const_1.Y_START, prevX = 0, prevY = 0, depth = 1) {
        if (this._ctx) {
            if (value) {
                const digits = `${value}`.length;
                const diff = digits > 2 ? (digits - 2) * 1.5 : 0;
                const fontSize = const_1.FONT_SIZE - diff;
                this._ctx.font = `${fontSize}px serif`;
                this._ctx.fillStyle = `${const_1.RECT_COLOR}`;
                this._ctx.fillRect(x, y, const_1.RECT_SIZE, const_1.RECT_SIZE);
                this._ctx.strokeText(`${value}`, !diff ? x + const_1.FONT_SIZE * .5 : x, y + const_1.FONT_SIZE * 1.25);
                if (prevX && prevY && depth > 2) {
                    this.drawPath(prevX, prevY + const_1.RECT_SIZE, x, y);
                }
            }
        }
    }
    drawPath(x1, y1, x2, y2) {
        if (this._ctx) {
            this._ctx.beginPath();
            this._ctx.moveTo(x1, y1);
            this._ctx.lineWidth = const_1.LINE_WIDTH;
            this._ctx.lineTo(x2, y2);
            this._ctx.stroke();
        }
    }
}
exports.BinarySearchTreePrinterVisualAdapter = BinarySearchTreePrinterVisualAdapter;
