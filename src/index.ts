type BenNode = VDomNode | TextNode
class VDomNode {
    tag: string
    props: Record<string, string>
    children: Array<BenNode>
    parent: VDomNode | undefined
    key: string | null
    component: boolean | null
    el: HTMLElement | undefined
    constructor({ tag, props, children, parent, el }: Pick<VDomNode, "tag" | "props" | "children" | "parent" | "el">) {
        if (!tag) {
            throw new Error('type is required')
        }

        console.log(children)
        // 虚拟节点
        this.tag = tag
        this.props = props
        this.children = children
        this.parent = parent || undefined
        this.key = null
        this.component = null
        this.el = el || undefined
    }
    // 渲染
    render() {
        // 创建真实的dom节点
        const el = document.createElement(this.tag)
        // 设置属性
        for (const key in this.props) {
            if (Object.hasOwnProperty.call(this.props, key)) {
                const element = this.props[key]
                el.setAttribute(key, element)
            }
            if (this.children) {
                this.children.forEach(child => {
                    el.appendChild(child.render())
                })
            }
        }
        return el
    }
    pushChildren(children) {
        if (children) {
            children.forEach(child => {
                if (child instanceof VDomNode) {
                    child.parent = this
                }
                this.children.push(child)
            })
        }
    }
}

class TextNode {
    textValue: string
    parent: BenNode | undefined
    constructor({ value, parent }: { value: string, parent?: BenNode }) {
        this.textValue = value
        this.parent = parent
    }
    render() {
        const el = document.createTextNode(this.textValue)
        return el
    }
}
function checkTextNode(node): boolean {
    return node.nodeName === '#text'
}
function domToVDomNode(node, parent = undefined): BenNode {
    // 创建虚拟dom节点
    let children: Array<BenNode> = []
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
const r = new Proxy({}, {
    get(target, key: string) {
        return function (info: string, props, children) {
            if (key == "text") {
                return new TextNode({ value: info })
            }
            return new VDomNode({ tag: key, props, children, parent: undefined, el: undefined })
        }
    }
}
)