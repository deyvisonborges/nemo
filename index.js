"use strict";

/**
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {ElementProps} props
 */
export function createElement(tag, props) {
  if (window === undefined || document === undefined)
    throw new Error("The 'createElement' function only works in the browser.");

  const el = document.createElement(tag);

  el._ref = el;

  if (props) {
    if (typeof props.children == "string") {
      el.appendChild(document.createTextNode(props.children));
    } else if (!Array.isArray(props.children)) {
      el.appendChild(props.children);
    } else if (Array.isArray(props.children)) {
      for (const child of props.children) {
        if (typeof child !== "string") {
          el.appendChild(child);
        }
      }
    }
  }

  return {
    el,
    ref: el._ref,
  };
}
