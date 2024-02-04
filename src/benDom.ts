type BenNodeType = VDomNode | TextNode
class VDomNode {
    tag: string
    props: Record<string, string>
    children: Array<BenNodeType>
    parent?: VDomNode
    key: string | null
    component: boolean | null
    el?: HTMLElement
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
    parent: BenNodeType | undefined
    constructor({ value, parent }: { value: string, parent?: BenNodeType }) {
        this.textValue = value
        this.parent = parent
    }
    render() {
        const el = document.createTextNode(this.textValue)
        return el
    }
}

export { BenNodeType, VDomNode, TextNode }