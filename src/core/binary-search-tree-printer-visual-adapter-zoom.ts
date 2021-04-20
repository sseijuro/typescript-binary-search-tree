import { CANVAS_NOT_SPECIFIED } from "./const";

export class BinarySearchTreePrinterVisualAdapterZoom {
    constructor(
        public canvas: HTMLCanvasElement | null = null,
        public draw: Function = () => {
        },
        public MAX_ZOOM: number = 5,
        public MIN_ZOOM: number = .2,
        public scale: number = 1,
        public worldX: number = 0,
        public worldY: number = 0,
        public mouseScreenX: number = 0,
        public mouseScreenY: number = 0,
        public mouseX: number = 0,
        public mouseY: number = 0,
        public mouseRealX: number = 0,
        public mouseRealY: number = 0,
        public mouseButton: number = 0,
        public bounds: DOMRect | null = null,
    ) {
        if (!canvas) {
            throw new Error(CANVAS_NOT_SPECIFIED);
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

    ify(num: number): number {
        return Math.floor(num * this.scale);
    }

    Xify(num: number): number {
        return Math.floor((num - this.worldX) * this.scale + this.mouseScreenX);
    }

    Yify(num: number): number {
        return Math.floor((num - this.worldY) * this.scale + this.mouseScreenY);
    }

    xFromScreenToWorld(num: number): number {
        return Math.floor((num - this.mouseScreenX) * (1 / this.scale) + this.worldX);
    }

    yFromScreenToWorld(num: number): number {
        return Math.floor((num - this.mouseScreenY) * (1 / this.scale) + this.worldY);
    }

    onMove(event: MouseEvent): void {
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

    onWheel(event: WheelEvent): void {
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

    setDraw = (fun: Function) => {
        this.draw = fun;
    };

}
