export const baseHandlers = {
    get: function (target: object, key: string | symbol) {
        return target[key];
    },
    set: function (target: object, key: string | symbol, value: unknown, receiver: object) {
        let oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver)
        return true;
    }
}