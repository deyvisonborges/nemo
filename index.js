"use strict";

const fs = require("fs");

function generateId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  return uniqid.toLowerCase();
}

/**
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {ElementProps} props
 */
export function createElement(tag, props, style) {
  if (window === undefined || document === undefined)
    throw new Error("The 'createElement' function only works in the browser.");

  const el = document.createElement(tag);

  el.setAttribute("data-id", generateId());

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
    component: el,
    style
  };
}

/**
 * @param {string} id - ID do elemento a ser encontrado.
 */
export function useElRef(el) {
  const findedEl = document.querySelector(`[data-id="${el.id}"]`);
  console.log(findedEl);
}

export function renderStyle(el) {
  fs.writeFileSync(`${el.id}.css`, style);
}
