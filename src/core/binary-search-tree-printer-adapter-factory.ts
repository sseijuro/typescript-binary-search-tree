import { AdapterType, MAX_VISUAL_DEPTH, METHOD_ALLOWED_IN_BROWSER, NOT_IMPLEMENTED_METHOD } from "./const";

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

    public removeContainer(): void {
        throw new Error(NOT_IMPLEMENTED_METHOD);
    }
}

export class BinarySearchTreePrinterConsoleAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    constructor() {
        super(AdapterType.ConsoleAdapter);
    }

    print(value: T | null = null, depth: number = 0, parent: T | null = null): void {
        console.log(`Value=${value}, depth=${depth}, parent=${parent}`);
    }
}

export class BinarySearchTreePrinterVisualAdapter<T> extends BinarySearchTreePrinterAdapter<T> {
    private _container: HTMLElement | null = null;
    private _containerInstance: boolean = false;
    private _depthRow: HTMLElement[] = [];

    constructor() {
        super(AdapterType.VisualAdapter);
        if (!window) {
            throw new Error(METHOD_ALLOWED_IN_BROWSER);
        }
    }

    removeContainer(): void {
        if (this._container) {
            this._container = null;
            this._depthRow = [];
            this._containerInstance = false;
            const visual = document.getElementById("app");
            if (visual) {
                visual.innerHTML = "";
            }
        }
    }

    print(value: T | null = null, depth: number = 0, parent: T | null = null): void {
        if (!this._containerInstance) {
            this._containerInstance = true;
            this._container = document.createElement("section");
            document.getElementById("app")?.append(this._container);
            for (let i = 0; i <= MAX_VISUAL_DEPTH; i++) {
                this._depthRow.push(document.createElement("div"));
                this._depthRow[i].setAttribute("data-depth", i.toString());
                this._container.append(this._depthRow[i]);
            }
        }
        const p: HTMLParagraphElement = document.createElement("p");
        p.setAttribute("parent", `${parent}`);
        p.setAttribute("value", `${value}`);
        const spanValue: HTMLSpanElement = document.createElement("span");
        spanValue.classList.add("span-value");

        if (value) {
            spanValue.innerText = p.getAttribute("value") ?? "x";
        }

        const bParent: HTMLSpanElement = document.createElement("b");
        bParent.classList.add("b-parent");
        bParent.innerText = p.getAttribute("parent") ?? "null";
        p.append(spanValue);

        p.append(bParent);
        this._depthRow[depth].append(p);
    }
}
