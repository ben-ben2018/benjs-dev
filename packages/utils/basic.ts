const _toString = Object.prototype.toString;

export function isObject(obj: any) { return typeof obj === 'object' }
export function isDef(v: any) { return v !== undefined && v !== null }
export function isPlainObject(obj: any) { return _toString.call(obj) === '[object Object]' }
export function isPromise(val: any) { return (isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function') }
export function isArray(val: any) { return Array.isArray(val) }
export const isIntegerKey = (key) => parseInt(key) + "" === key
export function isEqual(val1, val2) { return Object.is(val1, val2) }
export const isMap = (val) => toRawType(val) === 'Map'

export function toString(val: any) {
    if (val == null) return ""
    return isArray(val) || (isPlainObject(val) && val.toString === _toString) ? JSON.stringify(val, null, 2) : String(val)
}
export function toNumber(val: any) {
    let n = parseFloat(val);
    return isNaN(n) ? val : n
}
export const toRawType=(value: any) => toTypeString(value).slice(8, -1)
export function toMap(str: string, expectsLowerCase: boolean) {
    let map = Object.create(null);
    let list = str.split(',');
    for (let i = 0; i < list.length; i++) map[list[i]] = true;
    return expectsLowerCase ? function (val: string) { return map[val.toLowerCase()]; } : function (val: string) { return map[val]; }
}
export function toTypeString(str: unknown) { return _toString.call(str) }

export function noop() { }

export function hasChanged(newVal, oldVal) { return !isEqual(newVal, oldVal) }

export const extend = Object.assign