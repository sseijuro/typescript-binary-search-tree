import BinarySearchTree from "./core/binary-search-tree";
import BinarySearchTreePrinter from "./core/binary-search-tree-printer";
import { BinarySearchTreePrinterAdapterFactory } from "./core/binary-search-tree-printer-adapter-factory";

const tree = new BinarySearchTree<number>();
for (const value of [14, 24, 9, 6, 21, 16, 12, 8, 26]) {
    tree.add(value);
}

// adapter = new BinarySearchTreePrinterAdapterFactory<number).createConsoleAdapter();
const adapter = new BinarySearchTreePrinterAdapterFactory<number>().createVisualAdapter();
const printer = new BinarySearchTreePrinter<number>(tree, adapter);
printer.print();

document.querySelector("button.add-input")?.addEventListener("click", (e) => {
    e.preventDefault();
    const input = (document.getElementById("input") as HTMLInputElement);
    const value = input.value;
    if (value !== "" && value.length === Number(value).toString().length) {
        printer.getAdapter().clear();
        tree.add(Number(value));
        printer.print();
        input.value = "";
    }
});

document.querySelector("button.delete-input")?.addEventListener("click", (e) => {
    e.preventDefault();
    const input = (document.getElementById("input") as HTMLInputElement);
    const value = input.value;
    if (value !== "" && value.length === Number(value).toString().length) {
        printer.getAdapter().clear();
        tree.delete(Number(value));
        printer.print();
        input.value = "";
    }
});
