import { createElement, useElRef } from "./index.js";
const el = createElement("div", { children: "value" });

const app = document.getElementById("main");

if (app) {
  app.appendChild(el.component);
  useElRef(el.component);
}
