---
# Scope:
# * Introduction to setting configurations.
# * Introduction to the top and must-know configurations.
# * Point where to find the list of configuration options.

category: builds-integration
order: 35
---
{@snippet builds/guides/integration/build-toolbar-source}

# Editor toolbar

TODO

<info-box hint>
    Toolbar configuration is a strict UI-related setting. Removing a toolbar item does not remove the feature from the editor internals. If your goal with the toolbar configuration is to remove features, the right solution is to also remove their respective plugins. Check {@link builds/guides/integration/configuration#removing-features removing features} for more information.
</info-box>

## Basic toolbar configuration

In the builds that contain toolbars an optimal default configuration is defined for it. You may need a different toolbar arrangement, though, and this can be achieved through configuration.

Each editor may have a different toolbar configuration scheme, so it is recommended to check its documentation. In any case, the following example may give you a general idea:

```js
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		toolbar: [ 'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList' ]
	} )
	.catch( error => {
		console.log( error );
	} );
```
### Demo

TODO add demo for the snippet above

## Separating toolbar items

You can use `'|'` to create a separator between groups of toolbar items. It works in both the basic and [extended](#extended-toolbar-configuration-format) configuration formats:

Basic:

```js
toolbar: [ 'bold', 'italic', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList' ]
```

Extended:

```js
toolbar: {
    items: [ 'bold', 'italic', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList' ]
}
```

### Demo

TODO add demo for the snippet above

## Extended toolbar configuration format

You can use the extended {@link module:core/editor/editorconfig~EditorConfig#toolbar toolbar configuration} format to access additional options:

```js
toolbar: {
    items: [ 'bold', 'italic', '|', 'undo', 'redo', '-', 'numberedList', 'bulletedList' ],
    viewportTopOffset: 30,
    shouldNotGroupWhenFull: true
}
```

 * **`items`** &ndash; An array of toolbar item names. Most of the components (buttons, dropdowns, etc.) which can be used as toolbar items are described under the {@link features/index Features} tab. A full list is defined in {@link module:ui/componentfactory~ComponentFactory editor.ui.componentFactory} and can be listed using the following snippet: `Array.from( editor.ui.componentFactory.names() )`. Besides button names, you can also use the dedicated separators for toolbar groups (`'|'`) and toolbar lines (`'-'`). You can find more details in the {@link framework/guides/creating-simple-plugin Creating a simple plugin} guide.

 * **`viewportTopOffset`** &ndash; The offset (in pixels) from the top of the viewport used when positioning a sticky toolbar. Useful when a page with which the editor is being integrated has some other sticky or fixed elements (e.g. the top menu). Thanks to setting the toolbar offset, the toolbar will not be positioned underneath or above the page's UI.

 * **`shouldNotGroupWhenFull`** &ndash; When set to `true`, the toolbar will stop grouping items and let them wrap to the next line when there is not enough space to display them in a single row. This setting is `false` by default, which enables items grouping.

### Demo

The demo below presents the "regular" toolbar look with `shouldNotGroupWhenFull` set to `false`. If there are excess toolbar items for the display width, the toolbar gets grouped and some of the items are accessible via the clickable "Show more items" (⋮) button. The group separators (`'|'`) set in the configuration help organize the toolbar.

{@snippet builds/guides/integration/toolbar-grouping}

## Multiline (wrapping) toolbar

In the [extended toolbar configuration format](#extended-toolbar-configuration-format) it is also possible to arrange toolbar items into multiple lines. Here is how to achieve this:

* Set the `shouldNotGroupWhenFull` option to `true`, so items will not be grouped when the toolbar overflows but will wrap to the new line instead.
* Additionally, the `'-'` separator can be used inside the items list to set the breaking point explicitly.

```js
toolbar: {
    [ 'bold', 'italic', '|', 'undo', 'redo', '-', 'numberedList', 'bulletedList' ],
    shouldNotGroupWhenFull: true
}
```

### Automatic toolbar wrapping demo

When `shouldNotGroupWhenFull` is set to `true`, by default the toolbar items are automatically wrapped into a new line once they do not fit the editor width. The mechanism is automatic and only wraps excess items. Notice that while the toolbar group separators `'|'` are preserved, the groups may be split when they overflow.

```js
toolbar: {
    items: [
        'heading', '|',
        'fontfamily', 'fontsize', '|',
        'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        'code', 'codeBlock', '|',
        'imageUpload', 'blockQuote', '|',
        'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true
}
```

See how it works in practice. You may play with the browser window width to see how the buttons behave when the toolbar gets wrapped into multiple lines.

{@snippet builds/guides/integration/toolbar-wrapping}

### Explicit wrapping breakpoint demo

Setting an explicit break point in the toolbar configuration with `'-'` lets you create your own predefined multiline toolbar configuration. Toolbar items will then be grouped and put in lines as declared in the configuration.

```js
toolbar: {
    items: [
        'heading', '|',
        'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'link', '|',
        'bulletedList', 'numberedList', 'todoList', '-',
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'code', 'codeBlock', '|',
        'outdent', 'indent', '|',
        'imageUpload', 'blockQuote', '|',
        'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true
````

{@snippet builds/guides/integration/toolbar-breakpoint}

## Listing available items

You can use the following snippet to retrieve all toolbar items available in your editor:

```js
Array.from( editor.ui.componentFactory.names() );
```