import { isObject } from "packages/utils";

export enum ReactiveFlags {
    IS_REACTIVE = '__isReactive',
    IS_READONLY = '__isReadonly',
    SKIP = '__skip',
    RAW = '__raw'
}

export enum TargetTypes {
    INVALID = 0, // 无效对象
    COMMON = 1, // 普通对象
    COLLECTION = 2 // 集合对象
}

  export function readonly(target) {
    return createReactiveObject(target, true, readonlyMap, readonlyHandlers, readonlyCollectionHandlers)
  }
  
  export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveMap, shallowReactiveHandlers, shallowReactiveCollectionHandlers)
  }
  
  export function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyMap, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers)
  }

export function reactivity(obj) {
    return createReactiveObject(obj, {})
}

export function createReactiveObject(target, handlers) {
    if (!isObject(target)) return target;
    const proxy = new Proxy(target, handlers)
    return proxy
}

export const toReactive = (val) => isObject(val) ? reactive(val) : val
export const toReadonly = (val) => isObject(val) ? readonly(val) : val
export function isReadonly(val) {
    return !!val[ReactiveFlags.IS_READONLY]
}
export function isReactive(val) {
    return !!val[ReactiveFlags.IS_REACTIVE]
}


export function reactive(target) {

    //reactive创建对象，如果target是只读直接返回
    if (isReadonly(target)) {
        return target
    }
    return createReactiveObject(target, false, reactiveMap, mutableHandlers, mutableCollectionHandlers)
}
