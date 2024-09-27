import { itens } from "./itens.js"

let player;
let nav;

export function getNavAndPlayer(p, n) {
  player = p;
  nav = n;
}
// LoadScreen

// COntrole das barras de status
const fillhealth = document.querySelector(".health");
const fillstamine = document.querySelector(".stamine");
const fillhungry = document.querySelector(".hungry");
const fillthirst = document.querySelector(".thirst");


export function statusbar(type, total, value) {
  switch (type) {
    case "health":
      fillhealth.style.width = `${value / total * 100}%`;
      break;
    case "stamine":
      fillstamine.style.width = `${value / total * 100}%`;
      break;
    case "hungry":
      fillhungry.style.width = `${value / total * 100}%`;
      break;
    case "thirst":
      fillthirst.style.width = `${value / total * 100}%`;
      break;
  }
}

// Controle dos textos exibidos no log
const log = document.getElementById("log");

export function addText(type, text) {
  const logText = document.createElement("p");
  logText.innerText += text;
  log.appendChild(logText);
  if (type == "alert") {
    logText.style.color = "red";
  }
  return logText;
}

export function cleanLog() {
  log.innerHTML = "";
}

export function addOption(text) {
  const option = document.createElement("p");
  option.innerText = text;
  option.classList.add("option");
  log.appendChild(option);
  return option;
}

// Controle das opções do menu
const menuHolder = document.getElementById("menuHolder");
const home = document.getElementById("homebtn");
const inventoryBtn = document.getElementById("inventorybtn");
const inventory = document.getElementById("inventory");
const save = document.getElementById("savebtn");
let itemAction;
home.addEventListener("click", () => {
  nav.goHome()
})

inventoryBtn.addEventListener("click", showInvent)

export function showInvent() {
  inventory.innerHTML = `<div class="float_menu"></div>`
  const floatMenu = document.querySelector(".float_menu");
  menuHolder.style.display = "flex";
  player.inventory.forEach(item => {
    let i = itens[item.id]
    let ie = document.createElement("p")
    ie.innerText = item.qtd + " " + i.name
    ie.addEventListener("click", (event) => {
      const x = event.clientX
      const y = event.clientY
      floatMenu.style.left = x + "px"
      floatMenu.computedStyleMap.top = y + "px"
      floatMenu.style.display = "flex"
      floatMenu.innerHTML = ""
      i.options.forEach(option => {
        const o = document.createElement("p")
        o.innerText = option
        o.classList.add("option")
        floatMenu.appendChild(o)
        o.addEventListener("click", () => {
          useItem(option, i, item.id)
        })
      })
    })
    ie.classList.add("option")
    inventory.appendChild(ie)
  })
}


function useItem(action, item, id) {
  if (action == "Consumir") {
    player.eat(item, id)
  }
}
