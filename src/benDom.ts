type BenNodeType = VDomNode | TextNode
class VDomNode {
    tag: string
    props: Record<string, string>
    children: Array<BenNodeType>
    parent?: VDomNode
    key: string | null
    component: boolean | null
    el?: HTMLElement
    sonIndex: number
    constructor({ tag, props, children, el }: Pick<VDomNode, "tag" | "props" | "children" | "parent" | "el">) {
        if (!tag) {
            throw new Error('type is required')
        }

        console.log(children)
        // 虚拟节点
        this.tag = tag
        this.props = props
        this.children = []
        this.parent = undefined
        this.component = null
        this.el = el || undefined


        if (!this.parent) {
            this.key = "root"
            this.sonIndex = 0
        }
        this.pushChildren(children)
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
            children.forEach((child, index) => {
                if (child instanceof VDomNode) {
                    child.parent = this
                    child.sonIndex = index
                    child.key = child.parent.key + String(child.sonIndex) + child.tag
                } else if (child instanceof TextNode) {
                    child.parent = this
                    child.sonIndex = index
                    child.key = child.parent.key + String(child.sonIndex) + "text"
                }
                this.children.push(child)
            })
        }
    }
}

class TextNode {
    textValue: string
    parent: BenNodeType | undefined
    sonIndex: number
    key: string
    constructor({ value }: { value: string }) {
        this.textValue = value
    }
    render() {
        const el = document.createTextNode(this.textValue)
        return el
    }
}

export { BenNodeType, VDomNode, TextNode }