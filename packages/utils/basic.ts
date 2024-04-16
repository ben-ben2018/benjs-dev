const _toString = Object.prototype.toString;
function isObject(obj: any) { return typeof obj === 'object' }
function isDef(v: any) { return v !== undefined && v !== null }
function isPlainObject(obj: any) { return _toString.call(obj) === '[object Object]' }
function isPromise(val: any) { return (isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function') }
function toString(val: any) {
    if (val == null) return ""
    return Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ? JSON.stringify(val, null, 2) : String(val)
}
function toNumber(val: any) {
    let n = parseFloat(val);
    return isNaN(n) ? val : n
}
function toMap(str: string, expectsLowerCase: boolean) {
    let map = Object.create(null);
    let list = str.split(',');
    for (let i = 0; i < list.length; i++) map[list[i]] = true;
    return expectsLowerCase ? function (val: string) { return map[val.toLowerCase()]; } : function (val: string) { return map[val]; }
}
function toTypeString(str: unknown) { return _toString.call(str) }
function noop() { }

export { isObject, isDef, isPlainObject, isPromise, toString, toNumber, toMap, noop, toTypeString }