(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    var VDomNode = /** @class */ (function () {
        function VDomNode(_a) {
            var tag = _a.tag, props = _a.props, children = _a.children, parent = _a.parent, el = _a.el;
            if (!tag) {
                throw new Error('type is required');
            }
            console.log(children);
            // 虚拟节点
            this.tag = tag;
            this.props = props;
            this.children = children;
            this.parent = parent || undefined;
            this.key = null;
            this.component = null;
            this.el = el || undefined;
        }
        // 渲染
        VDomNode.prototype.render = function () {
            // 创建真实的dom节点
            var el = document.createElement(this.tag);
            // 设置属性
            for (var key in this.props) {
                if (Object.hasOwnProperty.call(this.props, key)) {
                    var element = this.props[key];
                    el.setAttribute(key, element);
                }
                if (this.children) {
                    this.children.forEach(function (child) {
                        el.appendChild(child.render());
                    });
                }
            }
            return el;
        };
        VDomNode.prototype.pushChildren = function (children) {
            var _this = this;
            if (children) {
                children.forEach(function (child) {
                    if (child instanceof VDomNode) {
                        child.parent = _this;
                    }
                    _this.children.push(child);
                });
            }
        };
        return VDomNode;
    }());
    var TextNode = /** @class */ (function () {
        function TextNode(_a) {
            var value = _a.value, parent = _a.parent;
            this.textValue = value;
            this.parent = parent;
        }
        TextNode.prototype.render = function () {
            var el = document.createTextNode(this.textValue);
            return el;
        };
        return TextNode;
    }());
    new Proxy({}, {
        get: function (target, key) {
            return function (info, props, children) {
                if (key == "text") {
                    return new TextNode({ value: info });
                }
                return new VDomNode({ tag: key, props: props, children: children, parent: undefined, el: undefined });
            };
        }
    });

}));
