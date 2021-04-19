import BinarySearchTree from "./core/binary-search-tree";
import BinarySearchTreePrinter from "./core/binary-search-tree-printer";
import { BinarySearchTreePrinterAdapterFactory } from "./core/binary-search-tree-printer-adapter-factory";

declare global {
    interface Window {
        tree: BinarySearchTree<number>;
        printer: BinarySearchTreePrinter<number>;
        addNode: (value: number) => void;
        deleteNode: (value: number) => void;
    }
}

window.tree = new BinarySearchTree<number>();
for (const value of [14, 24, 9, 6, 21, 16, 12, 4, 8, 26]) {
    window.tree.add(value);
}

// adapter = new BinarySearchTreePrinterAdapterFactory<number).createConsoleAdapter();
const adapter = new BinarySearchTreePrinterAdapterFactory<number>().createVisualAdapter();
window.printer = new BinarySearchTreePrinter<number>(window.tree, adapter);
window.printer.print();

document.querySelector("button.add-input")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.printer.getAdapter().clear();
    const value = (document.getElementById("addInput") as HTMLInputElement).value;
    window.tree.add(Number(value));
    window.printer.print();
});

document.querySelector("button.delete-input")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.printer.getAdapter().clear();
    const value = (document.getElementById("deleteInput") as HTMLInputElement).value;
    window.tree.delete(Number(value));
    window.printer.print();
});
