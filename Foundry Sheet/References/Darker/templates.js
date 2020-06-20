export const preloadPartials = function () {
	return loadTemplates([
    // Actor Sheet Partials
    "systems/dnd5e/templates/actors/parts/actor-traits.html",
    "modules/darksheet/templates/actors/parts/actor-inventory.html",
    "modules/darksheet/templates/actors/parts/actor-spellbook.html",
    "systems/dnd5e/templates/actors/parts/actor-features.html",

    // Item Sheet Partials
    "systems/dnd5e/templates/items/parts/item-action.html",
    "systems/dnd5e/templates/items/parts/item-activation.html",
    "modules/darksheet/templates/items/parts/item-description.html"
	]);
};

