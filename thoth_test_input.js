/**
 * @description This is some documentation with no code
 * 
 * @depends SomeLib
 * @depends SomeOtherLib v3.14
 * @depends YetAnotherLib v0.1.1.2.3.5.8.13
 * 
 * @option Object anOverallOption -- An option for the whole file
 * @option String undescribedOption
 */

// @prop String aProp -- Hey look it's a property!

@prop Number seven This shouldn't show up

// @method HTMLElement forgeElement(String tagName, Object properties, Array children) -- Daisy-chainable element maker

/**
 * @module PanelUI.Panel inherits EventEmitter
 * @description First example I had to copypasta
 * @description Another line of description
 * 
 * @example var panel = new PanelUI.Panel({id: 'css_id', heading: 'Your heading here', closeButton: true, accessKey: 'a'});
 * @example panel.open();
 * 
 * @option String  accessKey   -- Browser accesskey
 * @option Boolean closeButton -- Show a close button?
 * @option String  heading     -- Heading text
 * @option String  id          -- CSS ID
 */


// @prop HTMLElement domElement -- div tag that holds all of the Panel's HTML elements
// @prop Object keyCuts -- Key-value store of keyboard shortcuts. Keys are .charCode numbers, values are HTMLElement references
// @prop HTMLElement closeButton -- Reference to the close button (may not exist, depending on options)
// @prop proto Draggabilly draggie -- Attachment of Draggabilly library for drag-and-drop positioning
// @event eventful {String event, String properties} -- Describe the event with descriptions
// @method undefined open() -- Adds Panel's domElement to the document
// @method proto undefined close() -- Removes Panel's domElement from the document
// @method proto Boolean isOpen() -- Returns whether panel is currently open (attached to document)
