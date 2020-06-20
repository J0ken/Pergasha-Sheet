/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */

export const preloadPergasha5eHandlebarsTemplates = async function() {

  // Define template paths to load
  const pergasha5etemplatePaths = [

    // Actor Sheet Partials
    "modules/pergasha5e-sheet/templates/parts/pergasha5e-traits.html",
    "modules/pergasha5e-sheet/templates/parts/pergasha5e-inventory.html",
    "modules/pergasha5e-sheet/templates/parts/pergasha5e-features.html",
    "modules/pergasha5e-sheet/templates/parts/pergasha5e-spellbook.html"
  ];

  // Load the template parts
  return loadTemplates(pergasha5etemplatePaths);
};
