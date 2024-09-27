import { Player } from "./player.js";

import { statusbar, getNavAndPlayer } from "./UI.js";

import { Nav } from "./navigation.js"


const player = new Player();
player.statusUpdate()
const nav = new Nav(player);
getNavAndPlayer(player, nav)
nav.showStreets()
allnow()

function allnow() {
  statusbar("health", player.totalhealth, player.health);
  statusbar("stamine", player.totalstamine, player.stamine);
  statusbar("hungry", player.totalhungry, player.hungry);
  statusbar("thirst", player.totalthirst, player.thirst);
}