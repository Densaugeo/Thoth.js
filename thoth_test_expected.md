# thoth_test_input.js

This is some documentation with no code

Dependencies: `SomeLib` , `SomeOtherLib` v3.14, `YetAnotherLib` v0.1.1.2.3.5.8.13

#### Options

`Object` **anOverallOption** -- An option for the whole file

`String` **undescribedOption** 

#### Properties

`String` **aProp** -- Hey look it's a property!

#### Methods

`HTMLElement` **forgeElement**`(String tagName, Object properties, Array children)` -- Daisy-chainable element maker

---

## PanelUI.Panel

Inherits: `EventEmitter`

First example I had to copypasta

Another line of description

```
var panel = new PanelUI.Panel({id: 'css_id', heading: 'Your heading here', closeButton: true, accessKey: 'a'});
panel.open();
```

#### Options

`String` **accessKey** -- Browser accesskey

`Boolean` **closeButton** -- Show a close button?

`String` **heading** -- Heading text

`String` **id** -- CSS ID

#### Properties

`HTMLElement` **closeButton** -- Reference to the close button (may not exist, depending on options)

`HTMLElement` **domElement** -- div tag that holds all of the Panel's HTML elements

`Draggabilly` proto **draggie** -- Attachment of Draggabilly library for drag-and-drop positioning

`Object` **keyCuts** -- Key-value store of keyboard shortcuts. Keys are .charCode numbers, values are HTMLElement references

#### Methods

`undefined` proto **close**`()` -- Removes Panel's domElement from the document

`Boolean` proto **isOpen**`()` -- Returns whether panel is currently open (attached to document)

`undefined` **open**`()` -- Adds Panel's domElement to the document

#### Events

**eventful** `{String event, String properties}` -- Describe the event with descriptions

