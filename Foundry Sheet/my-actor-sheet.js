/**
 * Extend the basic ActorSheet with some very simple modifications
 * When you construct an ActorSheet, you pass it the Actor entity it modifies and an object of options
 */
class MyActorSheet extends ActorSheet {
  constructor(actor, options) {
    super(actor, options);
  }

  /**
   * This is where you set several default preferences for how your sheet will look and behave.
   * None of these options are required, this entire declaration could be deleted if you like.
   */
	static get defaultOptions() {
	  const options = super.defaultOptions;
	  options.classes = options.classes.concat(["my-sheet"]);  // Give your sheet a namespaced class so you can effectively target CSS rules
	  options.template = "public/systems/my-system/templates/my-actor-sheet.html";  // This will point towards the HTML file you are going to use for the sheet
    options.width = 600; // This configures the default starting width
    options.height = 720; // Starting height
    options.submitOnUnfocus = true;  // Should the form be saved when an input field is unfocused?
    options.submitOnClose = true;  // Should the form be saved when the sheet is closed?
    options.closeOnSubmit = false;  // Should the sheet be closed when it is submitted?
    options.resizable = true;  // Should the sheet be resizable?
	  return options;
  }

  /* -------------------------------------------- */

  /**
   * Prepare data for rendering the Actor sheet
   * The prepared data object contains both the actor data as well as additional sheet options
   * You do not need to define this function, the parent class does this for you
   * If you want to customize things and pass additional data into the HTML template, this is where you would do it
   */
  getData() {
    const data = super.getData();
    data.actor = data.entity;
    data.data = data.entity.data;
    return data;
  }


  /* -------------------------------------------- */

  /**
   * This is where you will define JavaScript event handling for your sheet to make it interactive
   * Some interactions (like resizing) are handled automatically for you by the parent class
   */
	activateListeners(html) {
    super.activateListeners(html);
  }
}

/**
 * An important step is to register your sheet so it can be used
 */
Actors.registerSheet("core", MyActorSheet, {
  types: [],            // Use this sheet for all types of actors, or just a specific type?
  makeDefault: true     // Make this sheet the default choice for these types of actors?
});
