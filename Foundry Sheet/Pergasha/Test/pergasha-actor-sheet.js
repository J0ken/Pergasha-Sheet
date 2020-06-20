/**
 * Extend the basic ActorSheet with some very simple modifications
 * When you construct an ActorSheet, you pass it the Actor entity it modifies and an object of options
 */
// class PergashaActorSheet extends ActorSheet {
//   constructor(actor, options) {
//     super(actor, options);
//   }
//
//   /**
//    * This is where you set several default preferences for how your sheet will look and behave.
//    * None of these options are required, this entire declaration could be deleted if you like.
//    */
// 	static get defaultOptions() {
// 	  const options = super.defaultOptions;
// 	  options.classes = options.classes.concat(["pergasha-actor-sheet"]);  // Give your sheet a namespaced class so you can effectively target CSS rules
// 	  options.template = "modules/Test/pergasha-actor-sheet.html";  // This will point towards the HTML file you are going to use for the sheet
//     options.width = 600; // This configures the default starting width
//     options.height = 720; // Starting height
//     options.submitOnUnfocus = true;  // Should the form be saved when an input field is unfocused?
//     options.submitOnClose = true;  // Should the form be saved when the sheet is closed?
//     options.closeOnSubmit = false;  // Should the sheet be closed when it is submitted?
//     options.resizable = true;  // Should the sheet be resizable?
//     // options.tabs = [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
// 	  return options;
//   }
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class PergashaActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["pergasha", "sheet", "actor"],
      template: "modules/Test/pergasha-actor-sheet.html",
      width: 600,
      height: 600,
      resizable: true,
      submitOnUnfocus: true,
      submitOnClose: true,
      closeOnSubmit: false,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
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
    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

  }



/* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }
}



/**
 * An important step is to register your sheet so it can be used
 */
Actors.registerSheet("core", PergashaActorSheet, {
  types: [],            // Use this sheet for all types of actors, or just a specific type?
  makeDefault: true     // Make this sheet the default choice for these types of actors?
});
