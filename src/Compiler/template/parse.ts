const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// 匹配 <div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// 匹配 > />
const startTagClose = /^\s*(\/?)>/
// 匹配 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const commentOpen = new RegExp(`<!--`)
const commentClose = new RegExp(`-->`)
const doctype = /^<!DOCTYPE [^>]+>/i
const annotation = /<!--[\s\S]*?-->/g
const simpleTags = ['meta', 'img', 'input', 'hr', 'br']
//注意树形的html 只能有一个根节点
function parseHtmlToAst(html: string) {

    html = html.replace(annotation, "")
    let hasDoctype = html.match(doctype)
    if (hasDoctype) {
        advance(hasDoctype[0].length)
    }
    let text, root, currentParent, stack = [];
    while (html) {
        let textEnd = html.indexOf("<");
        if (textEnd === 0) {
            //查找开始tag

            const startTagMatch = parseStartTag();
            if (startTagMatch) {
                //生成AST树
                start(startTagMatch);
                continue;
            }

            //查找结束标签
            const endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length);
                //构造ast树
                end();
                continue;
            }
        }
        //文本节点
        if (textEnd > 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            //截取字符串
            advance(text.length);
            chars(text);
        }

    }
    //截些开始标记
    function parseStartTag() {
        const start = html.match(startTagOpen);

        let end, attr;
        //找到开始标记
        if (start) {
            const match = ({
                tagName: start[1],
                attrs: []
            } as {
                tagName: string,
                attrs: any[],
                simple?: boolean,
                type: number
            })
            advance(start[0].length)
            //配置属性
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                let attrObj = {
                    type: 1,
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                }
                match.attrs.push(attrObj)
                if (attrObj.name[0] == "#") {
                    match.attrs.push({
                        name: "ben" + attrObj.name.slice(1)
                    })
                } else if (attrObj.name[0] == "$") {
                    match.attrs.push({
                        type: 2,
                        name: "bind",
                        attrKay: attrObj.name.slice(1),
                        value: "_ctr." + attrObj.value
                    })
                }

                advance(attr[0].length);
            }

            // console.log(match.tagName)
            if (end[0].includes("/>") || simpleTags.includes(match.tagName)) {
                match.simple = true
                html = html.replace(new RegExp(end[0]), `${end[0]}</${start[1]}>`)
            }

            //匹配结束字符 > 或 />
            if (end) {
                advance(end[0].length);
                // console.log("eee", end)
                // workList.forEach((work) => { work.fn(match, work.at) })
                return match;
            }
        }

    }

    //截取字符串
    function advance(n) {
        html = html.substring(n)
    }

    //构造AST树形
    function start(match) {
        let { tagName, attrs } = match

        const element = createAstElement(tagName, attrs);
        match.type == -1 ? match.element = element : null
        if (!root) {
            root = element;
        }
        currentParent = element;
        stack.push(element);
    }

    //结束钩爪树形
    function end() {
        const element = stack.pop();
        currentParent = stack[stack.length - 1];
        if (currentParent) {
            currentParent.children.push(element);
        }
    }

    //处理文本节点
    function chars(text) {
        text = text.trim();
        if (text.length > 0) {
            currentParent && currentParent.children.push({
                type: 3,
                text
            })
        }
    }

    function createAstElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent: null
        }
    }


    return root;
}
export default parseHtmlToAst