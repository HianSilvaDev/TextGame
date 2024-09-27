import { cidadeX } from "./bairros.js";
import { addOption, addText, cleanLog } from "./UI.js";
import { houses } from "./house.js"

let tired = false

export class Nav {
  constructor(player) {
    this.bairro = cidadeX[0].bairro;
    this.player = player
  }

  showStreets() {
    cleanLog()
    const ruas = cidadeX[0].bairro.ruas
    ruas.forEach(rua => {
      let opt = addOption("Ir para: " + rua.nome)
      opt.addEventListener("click", () => {
        this.move("rua", rua.nome)
      })
    })
  }

  showHouses() {
    cleanLog()
    addText("narration", "Você está na rua: " + this.rua.nome)
    const casas = this.rua.casas
    casas.forEach(casa => {
      let opt = addOption("Entrar na Casa N: " + casa)
      opt.addEventListener("click", () => {
        this.move("casa", casa)
      })
    })
    this.goBack()
  }



  goBack() {
    if(this.player.stamine <= 4){
      this.noStamine()
      return
    }
    let opt = addOption("Voltar")
    if (this.casa) {
      opt.addEventListener("click", () => {
        this.casa = null
        this.house = null
        this.showHouses()
      })
      return
    }

    if (this.rua) {
      opt.addEventListener("click", () => {
        this.rua = null
        this.showStreets()
      })
      return
    }
  }


  move(type, name) {
    if (this.player.stamine <= 4) {
      this.noStamine()
      return
    }
    switch (type) {
      case "rua":
        this.player.looseStamine(4)
        const rua = cidadeX[0].bairro.ruas.find(rua => rua.nome == name)
        this.rua = rua
        this.showHouses()
        break;
      case "casa":
        this.player.looseStamine(2)
        this.casa = name
        this.chooseHouse(name)
        break
      case "room":
        this.player.looseStamine(1)
        this.room = name
        this.showRooms()
        break
    }
  }

  noStamine() {
    if (!tired) {
      tired = true
      let n = addText("alert", "Você não tem stamina suficiente. Descanse um Pouco!")
      setTimeout(() => {
        n.remove()
        tired = false
      }, 2000)
    }
  }

  chooseHouse(casa) {
    cleanLog()
    let number = parseInt(casa)
    if (number > 0 && number <= 6) {
      this.house = houses[0]
    }
    const rooms = this.house.rooms
    const firstKey = Object.keys(rooms)[0]
    this.room = firstKey
    this.showRooms()
  }

  showRooms() {
    cleanLog()
    const rooms = this.house.rooms[this.room]
    addText("narration", "Você está no(a): " + this.room)
    rooms.forEach(room => {
      let opt = addOption("Ir para: " + room)
      opt.addEventListener("click", () => {
        this.move("room", room)
      })
    })
    this.leaveHouse()
  }

  leaveHouse() {
    let opt = addOption("Voltar para a rua")
    opt.addEventListener("click", () => {
      this.house = null
      this.room = null
      this.showHouses()
    })
  }

  resume(){
    if(this.room) return this.showRooms()
    if(this.rua) return this.showHouses() 
    this.showStreets()
  }
}