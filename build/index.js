"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const binary_search_tree_1 = __importDefault(require("./core/binary-search-tree"));
const binary_search_tree_printer_1 = __importDefault(require("./core/binary-search-tree-printer"));
const binary_search_tree_printer_adapter_factory_1 = require("./core/binary-search-tree-printer-adapter-factory");
const binary_search_tree_printer_visual_adapter_zoom_1 = require("./core/binary-search-tree-printer-visual-adapter-zoom");
const tree = new binary_search_tree_1.default();
for (const value of [14, 24, 9, 6, 21, 16, 12, 8, 26]) {
    tree.add(value);
}
// adapter = new BinarySearchTreePrinterAdapterFactory<number).createConsoleAdapter();
const zoom = new binary_search_tree_printer_visual_adapter_zoom_1.BinarySearchTreePrinterVisualAdapterZoom();
const adapter = new binary_search_tree_printer_adapter_factory_1.BinarySearchTreePrinterAdapterFactory().createVisualAdapter(zoom);
const printer = new binary_search_tree_printer_1.default(tree, adapter);
zoom.setDraw(printer.print);
printer.print();
(_a = document.querySelector("button.add-input")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    const value = input.value;
    if (value !== "" && value.length === Number(value).toString().length) {
        printer.getAdapter().clear();
        tree.add(Number(value));
        printer.print();
        input.value = "";
    }
});
(_b = document.querySelector("button.delete-input")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("input");
    const value = input.value;
    if (value !== "" && value.length === Number(value).toString().length) {
        printer.getAdapter().clear();
        tree.delete(Number(value));
        printer.print();
        input.value = "";
    }
});
