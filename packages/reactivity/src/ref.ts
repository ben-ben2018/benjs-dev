import { isObject, hasChanged } from "packages/utils";
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { createReactiveObject, toReactive } from "./reactive";
import { baseHandlers } from "./baseHandlers";
import { createDep } from "./dep";

function ref(value: any) {
    let target = isObject(value) ? { value } : value
    return createRef(target)
}

function createRef(value, isShallow = false) {
    return new RefImpl(value, isShallow)
}
export function toRef(target: Object | string, key: string) {
    return createObjectRef(target, key);
}
function createObjectRef(target, key) {
    return new ObjectRefImpl(target, key)
}

export function triggerRefValue(ref) {
    //此处的createDep是为了和cleanupEffect配合，直接重新创建一个引用避免循环执行
    triggerEffects(createDep(ref.dep))
}


class RefImpl {
    public dep
    public _value
    public __isRef = true
    constructor(public rawValue, public isShallow) {
        this._value = isShallow ? rawValue : toReactive(rawValue)
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        if (hasChanged(newValue, this.rawValue)) {
            this.rawValue = newValue
            this._value = this.isShallow ? newValue : toReactive(newValue)
            triggerRefValue(this)
        }
    }
}
class ObjectRefImpl {
    public __v_isRef = true
    public _object
    constructor(public target, public key) {
        this._object = target
    }

    set value(newValue) {
        if (hasChanged(newValue, this.target[this.key])) {
            this.target[this.key] = newValue
        }
    }

    get value() {
        return this.target[this.key]
    }
}
export function trackRefValue(ref) {
    if (isTracking()) {
        const dep = ref.dep || (ref.dep = new Set)
        trackEffects(dep)
    }
}

export default ref