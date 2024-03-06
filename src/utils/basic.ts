const _toString = Object.prototype.toString;
function isDef(v:any) { return v !== undefined && v !== null }
function isPlainObject(obj:any) {
    return _toString.call(obj) === '[object Object]'
}
function isPromise(val:any) {
    return (
        isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
}
function toString(val:any) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val)
}
function toNumber(val:any) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
}
function toMap(str: string, expectsLowerCase: boolean) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase
        ? function (val:string) { return map[val.toLowerCase()]; }
        : function (val:string) { return map[val]; }
}
function noop() { }