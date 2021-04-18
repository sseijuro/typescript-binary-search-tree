import { expect } from "chai";
import BinarySearchTree from "../src/binary-search-tree";
import BinarySearchTreePrinter from "../src/binary-search-tree-printer";
import {
    BinarySearchTreePrinterAdapterFactory,
    BinarySearchTreePrinterConsoleAdapter,
} from "../src/binary-search-tree-printer-adapter-factory";
import { AdapterType } from "../src/const";
import TreeNode from "../src/tree-node";

describe("TreeNode<T> Test Cases", () => {
    it("should create a tree node with value and empty children", () => {
        const value1 = 1;
        const node = new TreeNode<number>(value1);
        expect(node._value).to.equal(value1);
        expect(node._left).to.equal(null);
        expect(node._right).to.equal(null);
    });

    it("should create children in the tree node at left with value", () => {
        const value1 = 1;
        const value2 = 2;
        const node = new TreeNode<number>(value1);
        node._left = new TreeNode<number>(value2);
        expect(node._value).to.equal(value1);
        expect(node._left._value).to.equal(value2);
    });

    it("should create one child in the tree node at right with value", () => {
        const value1 = 1;
        const value2 = 2;
        const node = new TreeNode<number>(value1);
        node._right = new TreeNode<number>(value2);
        expect(node._value).to.equal(value1);
        expect(node._right._value).to.equal(value2);
    });

    it("should create 2 children to a tree node at right and left", () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const node = new TreeNode<number>(value1);
        node._right = new TreeNode<number>(value2);
        node._left = new TreeNode<number>(value3);
        expect(node._value).to.equal(value1);
        expect(node._right._value).to.equal(value2);
        expect(node._left._value).to.equal(value3);
    });

    it("should create 2 children to a tree node at right with value", () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const node = new TreeNode<number>(value1);
        node._right = new TreeNode<number>(value2);
        node._right._right = new TreeNode<number>(value3);
        expect(node._value).to.equal(value1);
        expect(node._right._value).to.equal(value2);
        expect(node._right._right._value).to.equal(value3);
    });

    it("should create 2 children to a tree node at left with value", () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const node = new TreeNode<number>(value1);
        node._left = new TreeNode<number>(value2);
        node._left._left = new TreeNode<number>(value3);
        expect(node._value).to.equal(value1);
        expect(node._left._value).to.equal(value2);
        expect(node._left._left._value).to.equal(value3);
    });
});

describe("BinarySearchTree<T> Test Cases", () => {
    it("should create binary search tree with empty root", () => {
        const tree = new BinarySearchTree<number>();
        expect(tree.getRoot()).to.equal(null);
    });

    it("should create binary search tree with root with value", () => {
        const tree = new BinarySearchTree<number>();
        const value1 = 10;
        tree.add(value1);
        expect(tree.getRoot()?._value).to.equal(value1);
    });

    it("should add children correct at left and right", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 7];
        arrayTree.forEach((el: number) => tree.add(el));
        expect(tree.getRoot()?._value).to.equal(arrayTree[0]);
        expect(tree.getRoot()?._left?._value).to.equal(arrayTree[2]);
        expect(tree.getRoot()?._right?._value).to.equal(arrayTree[1]);
    });

    it("should add children correct at left and left", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 5, 0];
        arrayTree.forEach((el: number) => tree.add(el));
        expect(tree.getRoot()?._value).to.equal(arrayTree[0]);
        expect(tree.getRoot()?._left?._value).to.equal(arrayTree[1]);
        expect(tree.getRoot()?._left?._left?._value).to.equal(arrayTree[2]);
    });

    it("should add children correct at right and right", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20];
        arrayTree.forEach((el: number) => tree.add(el));
        expect(tree.getRoot()?._value).to.equal(arrayTree[0]);
        expect(tree.getRoot()?._right?._value).to.equal(arrayTree[1]);
        expect(tree.getRoot()?._right?._right?._value).to.equal(arrayTree[2]);
    });

    it("should find node with correct value and children", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20, 13];
        arrayTree.forEach((el: number) => tree.add(el));
        const value1 = 15;
        const findNode = tree.find(value1);
        expect(findNode?._value).to.equal(value1);
        expect(findNode?._right?._value).to.equal(arrayTree[2]);
        expect(findNode?._left?._value).to.equal(arrayTree[3]);
    });

    it("should find maxDepth correct", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20];
        arrayTree.forEach((el: number) => tree.add(el));
        const realDepth = 3;
        expect(tree.maxDepth()).to.equal(realDepth);
    });

    it("should delete node with value and get different maxDepths", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20];
        arrayTree.forEach((el: number) => tree.add(el));
        const realDepth1 = 3;
        expect(tree.maxDepth()).to.equal(realDepth1);
        const value1 = 15;
        tree.delete(value1);
        const findNode = tree.find(value1);
        const realDepth2 = 2;
        expect(findNode).to.equal(null);
        expect(tree.maxDepth()).to.equal(realDepth2);
    });

    it("should delete node with value and get same maxDepths", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 5];
        arrayTree.forEach((el: number) => tree.add(el));
        const realDepth1 = 2;
        expect(tree.maxDepth()).to.equal(realDepth1);
        const value1 = 5;
        tree.delete(value1);
        const findNode = tree.find(value1);
        const realDepth2 = 2;
        expect(findNode).to.equal(null);
        expect(tree.maxDepth()).to.equal(realDepth2);
    });

});

describe("BinarySearchTreePrinterAdapterFactory<T> Test Cases", () => {
    it("should create a binary search tree printer adapter with console adapter type", () => {
        const factory = new BinarySearchTreePrinterAdapterFactory<number>();
        const adapter = factory.create(AdapterType.ConsoleAdapter);
        expect(adapter?.constructor).to.equal(BinarySearchTreePrinterConsoleAdapter);
    });

    it("should throw when trying create visual adapter outside of window context", () => {
        const factory = new BinarySearchTreePrinterAdapterFactory<number>();
        expect(() => factory.create(AdapterType.VisualAdapter)).to.throw();
    });
});

describe("BinarySearchTreePrinter<T> Test Cases", () => {
    it("should create a binary search tree printer with console adapter ", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20];
        arrayTree.forEach((el: number) => tree.add(el));
        const printer = new BinarySearchTreePrinter<number>(tree, new BinarySearchTreePrinterAdapterFactory<number>().createConsoleAdapter());
        expect(printer.getAdapter().constructor).to.equal(BinarySearchTreePrinterConsoleAdapter);
    });

    it("should throw when trying create a binary search tree printer with visual adapter outside of window context", () => {
        const tree = new BinarySearchTree<number>();
        const arrayTree = [10, 15, 20];
        arrayTree.forEach((el: number) => tree.add(el));
        expect(() => new BinarySearchTreePrinter<number>(tree, new BinarySearchTreePrinterAdapterFactory<number>().createVisualAdapter())).to.throw();
    });
});
