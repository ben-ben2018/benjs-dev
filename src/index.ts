import { BenNodeType, VDomNode, TextNode } from './benDom'
function checkTextNode(node): boolean {
    return node.nodeName === '#text'
}
function domToVDomNode(node, parent = undefined): BenNodeType {
    // 创建虚拟dom节点
    let children: Array<BenNodeType> = []
    let vdomNode
    if (checkTextNode(node)) {
        vdomNode = new TextNode({ value: node.nodeValue, parent })
    } else {
        if (node.hasChildNodes) { children = [...node.childNodes].map(child => domToVDomNode(child, node)) }
        vdomNode = new VDomNode({
            tag: node.nodeName.toLowerCase(),
            props: node.attributes ? [...node.attributes].reduce((o, n) => { o[n.name] = n.value; return o }, {}) : {},
            children,
            parent,
            el: node
        })

    }
    return vdomNode
}
class benNodeTree {
    root: any
    constructor(root) {
        this.root = domToVDomNode(root, undefined)
    }
}
window.r = new Proxy({}, {
    get(_, key: string) {
        return function (info: string, props, children) {
            if (key == "text") {
                return new TextNode({ value: info })
            }
            return new VDomNode({ tag: key, props, children, parent: undefined, el: undefined })
        }
    }
}
)

window.benNodeTree = benNodeTree