(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();class c{constructor({tag:t,props:e,children:n,el:r}){if(!t)throw new Error("tag is required");this.tag=t,this.props=e,this.children=[],this.parent=void 0,this.component=null,this.el=r||void 0,this.parent||(this.key="root",this.sonIndex=0),this.pushChildren(n)}render(){const t=document.createElement(this.tag);for(const e in this.props){if(Object.hasOwnProperty.call(this.props,e)){const n=this.props[e];t.setAttribute(e,n)}this.children&&this.children.forEach(n=>{t.appendChild(n.render())})}return t}pushChildren(t){t&&t.forEach((e,n)=>{e instanceof c?(e.parent=this,e.sonIndex=n,e.key=e.parent.key+String(e.sonIndex)+e.tag):e instanceof l&&(e.parent=this,e.sonIndex=n,e.key=e.parent.key+String(e.sonIndex)+"text"),this.children.push(e)})}}class l{constructor({value:t}){this.textValue=t}render(){return document.createTextNode(this.textValue)}}const u=new Proxy({},{get(s,t){return function(e,n){return t=="text"?new l({value:e.value}):new c({tag:t,props:e,children:n})}}});window.r=u;class a{constructor(t){}}function p(s){return{template:{content:`<template>
    <div>
        <h1>Hello, world!</h1>
    </div>
</template>
<script><\/script>
<style></style>`,ast:'{"tag":"div","props":[],"children":[{"tag":"h1","props":[],"children":[{"type":3,"text":"Hello, world!"}],"component":null,"key":"root","sonIndex":0}],"component":null,"key":"root","sonIndex":0}'}}}console.log(a);console.log(p());
