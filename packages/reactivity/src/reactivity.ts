import { isObject } from "packages/utils";
export function reactivity(obj) {
    return createReactiveObject(obj, {})
}

export function createReactiveObject(target, handlers) {
    if (!isObject(target)) return target;
    const proxy = new Proxy(target, handlers)
    return proxy
}
