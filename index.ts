const fs = require("fs");

// index.ts
type ElementProps = {
  children: string | Node;
};

export function createElement(
  tag: keyof HTMLElementTagNameMap,
  props?: ElementProps
) {
  if (window === undefined || document === undefined)
    throw new Error("The 'createElement' function only works in the browser.");

  const el = document.createElement(tag);
  const elRef = document.getElementById(el.id);

  if (props) {
    if (typeof props.children == "string") {
      el.appendChild(document.createTextNode(props.children));
      return;
    }

    if (!Array.isArray(props.children)) {
      el.appendChild(props.children!);
      return;
    }

    if (Array.isArray(props.children)) {
      for (const child of props.children) {
        if (typeof child !== "string") {
          el.appendChild(child);
        }
      }
    }
  }

  return {
    el,
    ref: elRef,
  };
}
