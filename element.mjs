import fs from "fs";

function generateId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  return uniqid.toLowerCase();
}

// element.mjs
export function createElement(tag, props, style) {
  const el = {
    tag,
    attributes: {
      "data-id": generateId(),
    },
    children: [],
    style,
  };

  if (props) {
    if (typeof props.children === "string") {
      el.children.push({ type: "text", content: props.children });
    } else if (!Array.isArray(props.children)) {
      el.children.push(props.children);
    } else if (Array.isArray(props.children)) {
      for (const child of props.children) {
        if (typeof child !== "string") {
          el.children.push(child);
        }
      }
    }
  }

  fs.writeFileSync(`${el.attributes["data-id"]}.css`, JSON.stringify(style));

  return {
    component: el,
  };
}

const generatedElement = createElement("input", null, { color: "red" });
console.log(generatedElement);
