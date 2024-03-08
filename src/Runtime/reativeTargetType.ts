export const enum ReactiveFlags {
    // 是否阻止成为代理属性
    SKIP = '__v_skip',
    // 是否是reactive属性
    IS_REACTIVE = '__v_isReactive',
    // 是否是readonly属性
    IS_READONLY = '__v_isReadonly',
    // mark target
    RAW = '__v_raw'
}
export interface Target {
    [ReactiveFlags.SKIP]?: boolean
    [ReactiveFlags.IS_REACTIVE]?: boolean
    [ReactiveFlags.IS_READONLY]?: boolean
    [ReactiveFlags.RAW]?: any
}