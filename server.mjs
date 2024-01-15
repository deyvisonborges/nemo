"use strict";

import fs from "fs";
import path from "path";

const styles = {}; // Armazena os estilos de cada elemento

function generateId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  return uniqid.toLowerCase();
}

/**
 * @param {keyof HTMLElementTagNameMap} tag
 * @param {ElementProps} props
 */
export function createElement(tag, props) {
  if (window === undefined || document === undefined)
    throw new Error("The 'createElement' function only works in the browser.");

  const el = document.createElement(tag);

  const id = generateId();
  el.setAttribute("data-id", id);

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
    id,
  };
}

/**
 * @param {HTMLElement} el - Elemento para o qual você deseja obter o estilo.
 */
export function getStyle(el) {
  const id = el.getAttribute("data-id");
  return styles[id] || "";
}

/**
 * @param {HTMLElement} el - Elemento para o qual você deseja adicionar o estilo.
 * @param {string} style - Estilo a ser adicionado.
 */
export function addStyle(el, style) {
  const id = el.getAttribute("data-id");
  styles[id] = styles[id] || "";
  styles[id] += style;
}

/**
 * Gera um arquivo CSS para cada elemento.
 */
export function generateCSS() {
  for (const id in styles) {
    const filename = path.join(__dirname, `${id}.css`);
    fs.writeFileSync(filename, styles[id]);
  }
}

/**
 * Gera o arquivo CSS principal que inclui todos os estilos.
 */
export function generateMainCSS() {
  const filename = path.join(__dirname, "main.css");
  fs.writeFileSync(filename, Object.values(styles).join("\n"));
}

/**
 * Inicia o servidor HTTP.
 */
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startServer() {
  const server = createServer((req, res) => {
    const filePath = req.url === "/" ? "main.css" : req.url.substring(1);
    const fullPath = path.join(__dirname, 'index.html');

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  });

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

startServer();
