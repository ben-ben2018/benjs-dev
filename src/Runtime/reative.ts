import { isObject, toTypeString } from "../utils/basic"
const __DEV__ = true
type Target = {}
const enum ReactiveFlags {
    // 是否阻止成为代理属性
    SKIP = '__v_skip',
    // 是否是reactive属性
    IS_REACTIVE = '__v_isReactive',
    // 是否是readonly属性
    IS_READONLY = '__v_isReadonly',
    // mark target
    RAW = '__v_raw'
}
// reactive origin类型常量
const enum TargetType {
    // 无效的 比如基础数据类型
    INVALID = 0,
    // 常见的 比如object Array
    COMMON = 1,
    // 集合类型比如 map set
    COLLECTION = 2
}

// 获取origin 类型辅助函数
function targetTypeMap(rawType: string) {
    switch (rawType) {
        case 'Object':
        case 'Array':
            return TargetType.COMMON
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return TargetType.COLLECTION
        default:
            return TargetType.INVALID
    }
}

const toRawType = (value: unknown): string => {
    // 从[object RawType]获取RawType
    return toTypeString(value).slice(8, -1)
}

// 获取origin的类型
function getTargetType(value: Target) {
    // 如果mark了不可reactive或者是不可扩展的直接返回无效
    return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
        ? TargetType.INVALID
        : targetTypeMap(toRawType(value))
}

function createReactiveObject(
    // 要代理的数据
    target: Target,
    // 是否是只读
    isReadonly: boolean,
    // 基础代理器
    baseHandlers: ProxyHandler<any>,
    // 集合代理器
    collectionHandlers: ProxyHandler<any>,
    // 映射map
    proxyMap: WeakMap<Target, any>
) {
    // 如果代理的数据不是obj则直接返回原对象
    if (!isObject(target)) {
        if (__DEV__) {
            console.warn(`转换响应式失败${String(target)}`);
        }
        return target;
    }
    // 如果传入的已经是代理了，而且不是readonly -> reactive的转换则直接返回
    if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])) {
        return target;
    }

    // 查看当前origin对象之前是不是创建过当前代理，如果创建过直接返回之前缓存的代理对象
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // 如果当前对象无法创建代理则直接返回origin
    const targetType = getTargetType(target);
    if (targetType === TargetType.INVALID) {
        return target;
    }

    // 查看当前origin type选择集合拦截器还是基础拦截器
    const proxy = new Proxy(target, targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers);
    // 缓存
    proxyMap.set(target, proxy);
    return proxy;
}
export default createReactiveObject