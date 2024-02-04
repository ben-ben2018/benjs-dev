export interface DOMAPI {
    createElement: (tagName: any) => HTMLElement;
    createElementNS: (namespaceURI: string, qualifiedName: string) => Element;
    createTextNode: (text: string) => Text;
    createComment: (text: string) => Comment;
    insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void;
    removeChild: (node: Node, child: Node) => void;
    appendChild: (node: Node, child: Node) => void;
    parentNode: (node: Node) => Node;
    nextSibling: (node: Node) => Node;
    tagName: (elm: Element) => string;
    setTextContent: (node: Node, text: string | null) => void;
    getTextContent: (node: Node) => string | null;
    isElement: (node: Node) => node is Element;
    isText: (node: Node) => node is Text;
    isComment: (node: Node) => node is Comment;
}

const TDomAPI: DOMAPI = {
    createElement: function (tagName: any): HTMLElement {
        return document.createElement(tagName);
    },
    createElementNS: function (namespaceURI: string, qualifiedName: string): Element {
        throw new Error("Function not implemented.");
    },
    createTextNode: function (text: string): Text {
        return document.createTextNode(text);
    },
    createComment: function (text: string): Comment {
        return document.createComment(text);
    },
    insertBefore: function (parentNode: Node, newNode: Node, referenceNode: Node | null): void {
        parentNode.insertBefore(newNode, referenceNode);
    },
    removeChild: function (node: Node, child: Node): void {
        node.removeChild(child);
    },
    appendChild: function (node: Node, child: Node): void {
        node.appendChild(child);
    },
    parentNode: function (node: Node): Node {
        return node.parentNode!;
    },
    nextSibling: function (node: Node): Node {
        return node.nextSibling!;
    },
    tagName: function (elm: Element): string {
        return elm.tagName;
    },
    setTextContent: function (node: Node, text: string | null): void {
        node.textContent = text;
    },
    getTextContent: function (node: Node): string | null {
        return node.textContent;
    },
    isElement: function (node: Node): node is Element {
        return node.nodeType === 1;
    },
    isText: function (node: Node): node is Text {
        return node.nodeType === 3;
    },
    isComment: function (node: Node): node is Comment {
        return node.nodeType === 8;
    }
}

export default TDomAPI