import {
    CANVAS_NOT_SPECIFIED,
    MAX_CANVAS_HEIGHT,
    MAX_CANVAS_WIDTH, SCALE_STEP,
    X_START,
    X_START_STEP,
    Y_START,
    Y_START_STEP,
} from "./const";

export class BinarySearchTreePrinterVisualAdapterZoom {
    constructor(
        public menuParent: Element = document.body,
        public canvas: HTMLCanvasElement | null = document.getElementsByTagName("canvas")[0],
        public draw: Function = () => {
        },
        public MAX_ZOOM: number = 5,
        public MIN_ZOOM: number = .2,
        public scale: number = 1,
        public worldX: number = 0,
        public worldY: number = 0,
        public mouseScreenX: number = 0,
        public mouseScreenY: number = 0,
        public X_START_SCALED: number = X_START,
        public Y_START_SCALED: number = Y_START,
    ) {
        if (!canvas) {
            throw new Error(CANVAS_NOT_SPECIFIED);
        }

        this.initMenu();

        this.ify = this.ify.bind(this);
        this.Xify = this.Xify.bind(this);
        this.Yify = this.Yify.bind(this);
        this.xFromScreenToWorld = this.xFromScreenToWorld.bind(this);
        this.yFromScreenToWorld = this.yFromScreenToWorld.bind(this);
    }

    getXstartScaled(): number {
        return this.X_START_SCALED;
    }

    getYstartScaled(): number {
        return this.Y_START_SCALED;
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

    clear(): void {
        const ctx = this.canvas?.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, MAX_CANVAS_WIDTH, MAX_CANVAS_HEIGHT);
        }
    }

    onWay(way: string): void {
        switch (way) {
            case "left":
                this.X_START_SCALED -= X_START_STEP;
                break;
            case "up":
                this.Y_START_SCALED -= Y_START_STEP;
                break;
            case "right":
                this.X_START_SCALED += X_START_STEP;
                break;
            case "down":
                this.Y_START_SCALED += Y_START_STEP;
                break;
            case "zoom-in":
                this.scale = Math.min(this.scale + SCALE_STEP, this.MAX_ZOOM);
                break;
            case "zoom-out":
                this.scale = Math.max(this.scale - SCALE_STEP, this.MIN_ZOOM);
                break;
        }
        this.clear();
        this.draw();
    }

    setRender = (fun: Function) => {
        this.draw = fun;
    };

    private initMenu(): void {
        this.createMenu(["left", "up", "right", "down"]);
        this.createMenu(["zoom-in", "zoom-out"]);
    }

    private createMenu(buttonArray: string[], parent: Element = this.menuParent): void {
        const menu = document.createElement("div");
        menu.classList.add("btn-group");
        this.menuParent.append(menu);
        for (const buttonName of buttonArray) {
            const but = document.createElement("button");
            but.innerText = buttonName;
            but.classList.add("btn", "btn-secondary");
            but.onclick = (e: MouseEvent) => {
                this.onWay(buttonName);
                e.preventDefault();
            };
            menu.append(but);
        }
        parent.append(document.createElement("br"));
        parent.append(menu);
    }

}
