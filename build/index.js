"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const binary_search_tree_1 = __importDefault(require("./core/binary-search-tree"));
const binary_search_tree_printer_1 = __importDefault(require("./core/binary-search-tree-printer"));
const binary_search_tree_printer_adapter_factory_1 = require("./core/binary-search-tree-printer-adapter-factory");
window.tree = new binary_search_tree_1.default();
for (const value of [14, 24, 9, 6, 21, 16, 12, 4, 8, 26]) {
    window.tree.add(value);
}
// adapter = new BinarySearchTreePrinterAdapterFactory<number).createConsoleAdapter();
const adapter = new binary_search_tree_printer_adapter_factory_1.BinarySearchTreePrinterAdapterFactory().createVisualAdapter();
window.printer = new binary_search_tree_printer_1.default(window.tree, adapter);
window.printer.print();
(_a = document.querySelector("button.add-input")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    window.printer.getAdapter().clear();
    const value = document.getElementById("addInput").value;
    window.tree.add(Number(value));
    window.printer.print();
});
(_b = document.querySelector("button.delete-input")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
    e.preventDefault();
    window.printer.getAdapter().clear();
    const value = document.getElementById("deleteInput").value;
    window.tree.delete(Number(value));
    window.printer.print();
});
