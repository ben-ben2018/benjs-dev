// @ts-ignore
import fs from 'node:fs'
import parseHtmlToAst from '../Compiler/template/parse'

export function benLoader(options = {}) {
    const mdRegex = /\.htm$/
    return {
        name: 'ben-loader',
        enforce: 'pre',

        async load(id: string) {
            if (!id.match(mdRegex)) {
                return
            }
            const [path, query] = id.split('?', 2)

            let data: string
            try {
                data = fs.readFileSync(path, 'utf-8')
            } catch (ex) {
                console.warn(ex, '\n', `${id} 无法被vite读取`)
                return
            }

            try {
                const ast = parseHtmlToAst(data)
                return `export default \`${JSON.stringify(ast.children[0])}\``
            } catch (ex) {
                console.warn(ex, '\n', `${id} template benLoader解析失败。（建议您检查：是否存在template是否为空的组件或页面）`)
                return `export default \`${null}\``
            }
        }
    }
}

export default benLoader 