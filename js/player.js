import { statusbar,  showInvent} from "./UI.js";

export class Player {
  constructor() {
    this.health = 20;
    this.totalhealth = 20;
    this.healthRate = 1;

    this.stamine = 40;
    this.totalstamine = 40;
    this.stamineRate = 1

    this.hungry = 100;
    this.totalhungry = 100;
    this.hungryRate = 1

    this.thirst = 100;
    this.totalthirst = 100;
    this.thirstRate = 1

    this.inventory = [
      {
        id: 0,
        qtd: 1
      },
      {
        id: 1,
        qtd: 2
      }
    ]
  }
  
  statusUpdate() {
    setInterval(() => {
      this.looseHungry(0.1)
      this.looseThirst(0.2)
      this.stamine = Math.max(0, Math.min(this.totalstamine, this.stamine + 0.2));
      this.UpdateAllStats()
    }, 1000)
  }

  looseHealth(amount) {
    this.health = Math.max(0, this.health - (amount * this.thirstRate));

  }

  looseStamine(amount) {
    this.stamine = Math.max(0, this.stamine - (amount * this.stamineRate));

  }

  looseHungry(amount) {
    this.hungry = Math.max(0, this.hungry - (amount * this.hungryRate));

  }

  looseThirst(amount) {
    this.thirst = Math.max(0, this.thirst - (amount * this.thirstRate));

  }

  UpdateAllStats() {
    statusbar("thirst", this.totalthirst, this.thirst);
    statusbar("hungry", this.totalhungry, this.hungry);
    statusbar("stamine", this.totalstamine, this.stamine);
    statusbar("health", this.totalhealth, this.health);
    console.log(this.hungry)
  }

  eat(item, id){
    if(item.eatEffect.hungry){
      this.hungry = Math.min(this.totalhungry, this.hungry + item.eatEffect.hungry)
    }
    if(item.eatEffect.thirst){
      this.thirst = Math.min(this.totalthirst, this.thirst + item.eatEffect.thirst)
    }
    if(item.eatEffect.stamine){
      this.stamine = Math.min(this.totalstamine, this.stamine + item.eatEffect.stamine)
    }
    
    this.inventory.forEach(inv => {
      if(inv.id == id){
        inv.qtd = inv.qtd - 1
        if(inv.qtd <= 0){
          this.inventory.splice(this.inventory.indexOf(inv), 1)
          showInvent()
        }
      }
    })
  }
}