"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTreePrinterVisualAdapterZoom = void 0;
const const_1 = require("./const");
class BinarySearchTreePrinterVisualAdapterZoom {
    constructor(canvas = null, draw = () => {
    }, MAX_ZOOM = 5, MIN_ZOOM = .2, scale = 1, worldX = 0, worldY = 0, mouseScreenX = 0, mouseScreenY = 0, mouseX = 0, mouseY = 0, mouseRealX = 0, mouseRealY = 0, mouseButton = 0, bounds = null) {
        this.canvas = canvas;
        this.draw = draw;
        this.MAX_ZOOM = MAX_ZOOM;
        this.MIN_ZOOM = MIN_ZOOM;
        this.scale = scale;
        this.worldX = worldX;
        this.worldY = worldY;
        this.mouseScreenX = mouseScreenX;
        this.mouseScreenY = mouseScreenY;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.mouseRealX = mouseRealX;
        this.mouseRealY = mouseRealY;
        this.mouseButton = mouseButton;
        this.bounds = bounds;
        this.setDraw = (fun) => {
            this.draw = fun;
        };
        if (!canvas) {
            throw new Error(const_1.CANVAS_NOT_SPECIFIED);
        }
        canvas.addEventListener("wheel", (e) => this.onWheel(e));
        canvas.addEventListener("mousemove", (e) => this.onMove(e));
        canvas.addEventListener("mousedown", (e) => this.onMove(e));
        canvas.addEventListener("mouseup", (e) => this.onMove(e));
        canvas.addEventListener("mouseout", (e) => this.onMove(e));
        this.ify = this.ify.bind(this);
        this.Xify = this.Xify.bind(this);
        this.Yify = this.Yify.bind(this);
        this.xFromScreenToWorld = this.xFromScreenToWorld.bind(this);
        this.yFromScreenToWorld = this.yFromScreenToWorld.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onWheel = this.onWheel.bind(this);
    }
    ify(num) {
        return Math.floor(num * this.scale);
    }
    Xify(num) {
        return Math.floor((num - this.worldX) * this.scale + this.mouseScreenX);
    }
    Yify(num) {
        return Math.floor((num - this.worldY) * this.scale + this.mouseScreenY);
    }
    xFromScreenToWorld(num) {
        return Math.floor((num - this.mouseScreenX) * (1 / this.scale) + this.worldX);
    }
    yFromScreenToWorld(num) {
        return Math.floor((num - this.mouseScreenY) * (1 / this.scale) + this.worldY);
    }
    onMove(event) {
        if (this.canvas) {
            switch (event.type) {
                case "mousedown":
                    this.mouseButton = 1;
                    break;
                case "mouseup":
                case "mouseout":
                    this.mouseButton = 0;
                    break;
                default:
                    break;
            }
            console.log(event.type);
            this.bounds = this.canvas.getBoundingClientRect();
            this.mouseX = event.clientX - this.bounds.left;
            this.mouseY = event.clientY - this.bounds.top;
            const lastRealX = this.mouseRealX;
            const lastRealY = this.mouseRealY;
            this.mouseRealX = this.Xify(this.mouseX);
            this.mouseRealY = this.Yify(this.mouseY);
            if (this.mouseButton) {
                this.worldX -= this.mouseRealX - lastRealX;
                this.worldY -= this.mouseRealY - lastRealY;
                this.mouseRealX = this.xFromScreenToWorld(this.mouseX);
                this.mouseRealY = this.yFromScreenToWorld(this.mouseY);
            }
            this.draw();
        }
    }
    onWheel(event) {
        this.scale = event.deltaY > 0 ? Math.max(this.MIN_ZOOM, this.scale) : Math.min(this.MAX_ZOOM, this.scale);
        this.worldX = this.mouseRealX;
        this.worldY = this.mouseRealY;
        this.mouseScreenX = this.mouseX;
        this.mouseScreenY = this.mouseY;
        this.mouseRealX = this.xFromScreenToWorld(this.mouseX);
        this.mouseRealY = this.yFromScreenToWorld(this.mouseY);
        this.draw();
        event.preventDefault();
    }
}
exports.BinarySearchTreePrinterVisualAdapterZoom = BinarySearchTreePrinterVisualAdapterZoom;
