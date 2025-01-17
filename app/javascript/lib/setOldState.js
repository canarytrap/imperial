import { Nation, Nation2030 } from "./constants.js";

export default (game) => {
  let units = new Map;
  for (const [key, value] of game.units) {
    const newValue = new Map;
    for (const [key2, value2] of value) {
      newValue.set(key2, Object.assign({}, value2));
    }
    if (game.baseGame === "imperial") {
      units.set(Nation[key.value], newValue);
    } else if (game.baseGame === "imperial2030") {
      units.set(Nation2030[key.value], newValue);
    }
  }
  let nations = new Map();
  for (const [key, value] of game.nations) {
    if (game.baseGame === "imperial") {
      nations.set(Nation[key.value], Object.assign({}, value));
    } else if (game.baseGame === "imperial2030") {
      nations.set(Nation2030[key.value], Object.assign({}, value));
    }
  }
  let provinces = new Map();
  for (const [key, value] of game.provinces) {
    provinces.set(key, Object.assign({}, value));
  }
  let availableBonds = new Set();
  for (const bond of game.availableBonds) {
    availableBonds.add(bond);
  }
  let availableActions = new Set();
  for (const action of game.availableActions) {
    availableActions.add(action);
  }
  let players = {};
  for (const player of Object.keys(game.players)) {
    players[player] = {};
    players[player].cash = game.players[player].cash;
    players[player].name = game.players[player].name;
    players[player].rawScore = game.players[player].rawScore;
    let bonds = new Set();
    for (const bond of game.players[player].bonds) {
      bonds.add(bond)
    }
    players[player].bonds = bonds;
  }
  let fleetConvoyCount = {};
  for (const province of Object.keys(game.fleetConvoyCount)) {
    fleetConvoyCount[province] = game.fleetConvoyCount[province]
  }
  let coexistingNations = [];
  for (const nation of game.coexistingNations) {
    coexistingNations.push(nation);
  }
  let swissBanksWhoDoNotInterrupt = [];
  for (const bank of game.swissBanksWhoDoNotInterrupt) {
    swissBanksWhoDoNotInterrupt.push(bank);
  }

  return {
    units,
    nations,
    provinces,
    availableBonds,
    availableActions,
    players,
    fleetConvoyCount,
    coexistingNations,
    currentNationInConflict: game.currentNationInConflict,
    swissBanksWhoDoNotInterrupt,
    importing: false,
    buildingFactory: game.buildingFactory
  }
}
