import { Ben } from "../../src"
import { render } from "../components/Header.htm"
new Ben({
    el: "#app",
})
console.log(render({ e: 6 }))
