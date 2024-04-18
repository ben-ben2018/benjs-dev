import { isObject } from "packages/utils";
import { createReactiveObject } from "./reactive";
import { baseHandlers } from "./baseHandlers";

function ref(value: any) {
    if (!isObject(value)) {
        value = { value }
    }

    const collectionHandlers = {
    }
    return createReactiveObject(value, baseHandlers)
}

export default ref