function defineComponent(componentTag?: string) {
  class Component extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });

      const text = this.getAttribute("data-text");

      // Create some CSS to apply to the shadow dom
      // const style = document.createElement("style");
      // console.log(style.isConnected); 

      // Attach the created elements to the shadow dom
      // shadow.appendChild(style);
      // shadow.appendChild(wrapper);
    }
  }
  customElements.define(componentTag.includes("-") ? componentTag : "ben-" + componentTag, Component);

  return 1
}
