import { BenNodeType, VDomNode, TextNode } from './benDom'
function checkTextNode(node): boolean {
    return node.nodeName === '#text'
}
function domToVDomNode(node, parent = undefined): BenNodeType {

    let children: Array<BenNodeType> = []
    let vdomNode
    if (checkTextNode(node)) {
        vdomNode = new TextNode({ value: node.nodeValue })
    } else {
        if (node.hasChildNodes) { children = [...node.childNodes].map(child => domToVDomNode(child, node)) }
        vdomNode = new VDomNode({
            tag: node.nodeName.toLowerCase(),
            props: node.attributes ? [...node.attributes].reduce((o, n) => { o[n.name] = n.value; return o }, {}) : {},
            children,
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
const renderWorker = new Proxy({} as Record<string, Function>, {
    get(_, key: string) {
        return function (props, children) {
            if (key == "text") {
                return new TextNode({ value: props.value })
            }
            return new VDomNode({ tag: key, props: props, children })
        }
    }
})
window.r = renderWorker

class Ben {
    constructor(options) {
        this.mount(options.el)
     }
     mount(query){
        const container = document.querySelector(query)
        container.innerHTML = ""
        container.setAttribute('data-b-app', '')
     }
}

export { Ben }