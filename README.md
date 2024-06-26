
Use custom cursors in your HTML, CSS & JavaScript application (Browser & NodeJs).
> - Simple and easy to use.
> - Can also be used in your own application.
> - Primarily uses tochiResources cursors, use your own cursors instead if necessary.
> - Works in both NodeJs and Browser contexts (read more below).

## Demo
![tochiResources cursros overview](https://github.com/tochiResources/cursors/assets/34287213/a4bd4efa-a946-4f0b-8764-f85f6cf4e3fb)

[See live demo here](https://tochi.moe)

## Install
[Method 1] Import directly into your .css file **(recommended)**:
1. Download the cursors at [Releases](https://github.com/tochiResources/cursors/releases) and then add this to your main .css file:
```css
/* Variables */
:root {
    /* navigate to cursors */
    --cursor-default: url("./web-friendly/32x32/pointer.png") 3 3, auto;
    --cursor-pointer: url("./web-friendly/32x32/link.png") 5 2, auto;
    --cursor-text: url("./web-friendly/32x32/beam.png") 16 16, auto;
}
/* Semantic tags */
/* default */ body, [type], p, label, span, h1, h2, h3, h4, h5, h6, body:disabled, [type]:disabled, header:disabled, nav:disabled, div:disabled, main:disabled, section:disabled, article:disabled, aside:disabled, footer:disabled, details:disabled, figure:disabled, a:disabled, p:disabled, label:disabled, span:disabled, h1:disabled, h2:disabled, h3:disabled, h4:disabled, h5:disabled, h6:disabled, input[type="button"]:disabled, input[type="checkbox"]:disabled, input[type="reset"]:disabled, input[type="radio"]:disabled, input[type="range"]:disabled, input[type="submit"]:disabled, input:disabled, input[type="file"]:disabled, input[type="text"]:disabled, input[type="email"]:disabled, input[type="password"]:disabled, input[type="search"]:disabled, input[type="date"]:disabled, input[type="datetime-local"]:disabled, input[type="month"]:disabled, input[type="week"]:disabled, input[type="number"]:disabled, input[type="tel"]:disabled, input[type="time"]:disabled, input[type="url"]:disabled, button:disabled { cursor: var(--cursor-default) !important; }
/* pointer */ a, a:hover, input[type="button"], input[type="checkbox"], input[type="reset"], input[type="radio"], input[type="range"], input[type="submit"], button, button:hover { cursor: var(--cursor-pointer) !important; }
/* text */ input, input[type="file"], input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="date"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="number"], input[type="tel"], input[type="time"], input[type="url"] { cursor: var(--cursor-text) !important; }
```

**OR**

[Method 2] Import into a framework (like ReactJS) - remember to import it after your main .css imports
1. Download the cursors at [Releases](https://github.com/tochiResources/cursors/releases) and then add this to your main .css file:
```css
:root {
    /* navigate to cursors */
    --cursor-default: url("./web-friendly/32x32/pointer.png") 3 3, auto;
    --cursor-pointer: url("./web-friendly/32x32/link.png") 5 2, auto;
    --cursor-text: url("./web-friendly/32x32/beam.png") 16 16, auto;
}
```
2. Import into your framework index file:
```js
npm i @tochiresources/cursors
```
```js
import "@tochiresources/cursors/index.css";
```

**OR**

[Method 3] Install using npm:
```js
npm i @tochiresources/cursors
```

## Examples (if installed with method 3)
### JavaScript
```js
const cursors = require('@tochiresources/cursors');
```
> Use `multiContext` to enable multicontextual support eg. NodeJs and Browser contexts at the same time.
> - Enabling this will prioritize Browser context.

```js
cursors.multiContext(true);
```
> `(NodeJs)` Apply once for **all semantic and relevant** elements with `apply`.

```js
// simple
cursors.apply('./css/styles.css', './css');

// with more arguments
cursors.apply('./css/styles.css', './css', cursors.CursorSize.small, cursors.CursorColor.white, 200);

// with more arguments and custom cursors
cursors.applySelectors('./css/styles.css', './css', cursors.CursorSize.small, null, 200, { // color will be ignored when using custom options
  // override directory path
  // custom cursors should be placed in respective cursor size folder structure eg. 32x32/cursor.png, 64x64/cursor.png and 128x128/cursor.png
  cursorDir: "./test/cursors", // directory path containing cursor size folders (relative to the outputFolder if you change this)

  // override all available cursors
  default: { name: "pointer", offset: new CursorOffset(3, 3) },
  pointer: { name: "link", offset: new CursorOffset(5, 2) },
  text: { name: "beam", offset: new CursorOffset(16, 16) },
  progress: { name: "working", offset: new CursorOffset(3, 3) },
  wait: { name: "busy", offset: new CursorOffset(16, 16) },
  allScroll: { name: "move", offset: new CursorOffset(16, 16) },
  ewResize: { name: "horz", offset: new CursorOffset(16, 16) },
  nsResize: { name: "vert", offset: new CursorOffset(16, 16) },
  neswResize: { name: "dgn2", offset: new CursorOffset(16, 16) },
  nwseResize: { name: "dgn1", offset: new CursorOffset(16, 16) }
});
```
> `(Browser)` Apply once for **all semantic and relevant** elements with `applyWeb`.

```js
// simple
cursors.applyWeb('css/styles.css');

// with more arguments
cursors.applyWeb('css/styles.css', cursors.CursorSize.small, cursors.CursorColor.white, 200);

// with more arguments and custom cursors
cursors.applySelectorsWeb('css/styles.css', cursors.CursorSize.small, null, 200, { // color will be ignored when using custom options
  // override directory path
  // custom cursors should be placed in respective cursor size folder structure eg. 32x32/cursor.png, 64x64/cursor.png and 128x128/cursor.png
  cursorDir: "<your-root-folder>/bin/cursors", // directory path containing cursor size folders (absolute path is recommended)

  // override all available cursors
  default: { name: "pointer", offset: new CursorOffset(3, 3) },
  pointer: { name: "link", offset: new CursorOffset(5, 2) },
  ...
});
```
> `(NodeJs)` Apply for **custom individual** elements with `applySelectors`.

```js
// simple
cursors.applySelectors('./css/styles.css', './css', '#logo, .tab, .drop-zone');

// with more arguments
cursors.applySelectors('./css/styles.css', './css', '#logo, .tab, .drop-zone', cursors.CursorSize.small, cursors.CursorColor.white);

// with more arguments and custom cursors
cursors.applySelectors('./css/styles.css', './css', '#logo, .tab, .drop-zone', cursors.CursorSize.small, null, {
  cursorDir: "./bin/cursors",
  default: { name: "custom1", offset: new CursorOffset(3, 3), },
  pointer: { name: "custom2", offset: new CursorOffset(5, 3), },
  ...
});
```
> `(Browser)` Apply for **custom individual** elements with `applySelectorsWeb`.

```js
// simple
cursors.applySelectorsWeb('css/styles.css', '#logo, .tab, .drop-zone');

// with more arguments
cursors.applySelectorsWeb('css/styles.css', '#logo, .tab, .drop-zone', cursors.CursorSize.small, cursors.CursorColor.white);

// with more arguments and custom cursors)
cursors.applySelectorsWeb('css/styles.css', '#logo, .tab, .drop-zone', cursors.CursorSize.small, null, {
  cursorDir: "./bin/cursors",
  default: { name: "custom1", offset: new CursorOffset(3, 3), },
  pointer: { name: "custom2", offset: new CursorOffset(5, 3), },
  ...
});
```

**In case you're confused** about the difference between these methods:
- `NodeJs`
  - Use `apply` to automatically apply cursors on relevant semantic HTML tags and selectors.
  - Use `applySelectors` to apply cursors on specified selectors only.
- `Browser`
  - `applyWeb` same as NodeJs but only works in Browser context.
  - `applySelectorsWeb` same as NodeJs but only works in Browser context.

### CSS (if installed with method 3)
> You can apply cursor styles normally in your css file like:

```css
.selectorClass div {
  cursor: text;
}

#selectorId a:hover {
  cursor: pointer;
}
```
> and then the selector's cursor property will automatically be converted to a tochiResources cursor.

See supported cursor types down below or ![click here](https://github.com/tochiResources/cursors/tree/main#constants).

Please take a look at the API below for more details.

### How it works (if installed with method 3)
When using `apply(styleSheetUrl, size, color, delay, options)`:

1. Apply cursors on semantic HTML tags eg. `button` and `a`.
2. Find css file (`styleSheetUrl`) and read it's contents.
3. Find rules from css file contents with a `cursor` property and then obtain the selectors and cursor value.
4. Apply cursors on obtained data.


When using `applySelectors(styleSheetUrl, selectors, size, color, options)`:

1. Find css file (`styleSheetUrl`) and read it's contents.
2. Find specified selectors from css file contents, check if the rules contains a `cursor` property and then obtain the selectors and cursor value.
3. Apply cursors on obtained data.

As you can see `applySelectors` skips semantic HTML tags and only focues on specified selectors.

- This approach allows a lightweight process and performs faster than using `querySelector` to apply cursors on HTML elements.
- The latter have been tested and performs extremely poorly.
- HTML elements' applied cursor property won't be overridden if changed through JavaScript because of the generated internal style tag (Browser) or the generated css file (NodeJs).

**Output**
- You can see how the css will look like by checking out ![test/tochiResources-cursors](./test/tochiResources-cursors.css).
- A `.css` file will be generated when using this in NodeJs context.
- A HTML `<style>` tag will be created/appended inside the `<head>` tag in Browser context.

**Performance may become a concern if:**
- Specified css file (`styleSheetUrl`) exceeds more than 2000 lines (not tested above this limit).

**CssScanner**
- This module uses ![douzi8/css-scanner](https://github.com/douzi8/css-scanner/tree/master) to scan through specified css file (`styleSheetUrl`).

### Notes
> [!IMPORTANT]
> **You don't need to specify a cursor property for semantic HTML tags**. They will automatically be applied accordingly if you use `apply` or `applyWeb`.
> To include other HTML tags or elements they must require a valid `class` or `id` attribute and be referenced in your css file (`styleSheetUrl`).

> [!NOTE]
> **Dynamic sites:**
> 
> May not work on dynamically added elements but that's when you can use the `cursor.applySelectors('css/styles.css', selectors)` function to apply cursors on specified elements.
>
> **Cursor sizes:**
> 
> Most browsers won't support cursor sizes above `small` which is `32 x 32`.

## API
### Methods
**multiContext(value)**
> Set to `true` if your application is multicontextual eg. supports both NodeJs and Browser contexts at the same time

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
value | `boolean` | | required | Should be used before `apply`, `applyWeb`, `applySelectors` and `applySelectorsWeb`

**apply(styleSheetUrl, size, color, delay, options)**
> `(NodeJs only)` Automatically apply cursors on relevant semantic HTML tags and css selectors in a document.

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
styleSheetUrl | `string` | | required | Url of the styleSheet that will be inspected relative to your root directory (accepts absolute path and web url)
outputFolder | `string` | | required | Directory path relative to your root directory for the generated css file `tochiResources-cursors.css`
size | `string` | `CursorSize.small` | optional | Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
color | `string` | `CursorColor.white` | optional | Choose between white and gray (ignored when using custom options)
delay | `number` | `200` | optional | The delay for when cursors will be applied after all elements in the document has been rendered
options | `object` | `see options below` | optional | Override default cursor options

**applySelectors(styleSheetUrl, selectors, size, color, options)**
> `(NodeJs only)` Apply cursors on specified css selectors in a document.

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
styleSheetUrl | `string` | | required | Url of the styleSheet that will be inspected relative to your root directory (accepts absolute path and web url)
outputFolder | `string` | | required | Directory path relative to your root directory for the generated css file `tochiResources-cursors.css`
selectors | `string` | | required | Selectors that will be inspected
size | `string` | `CursorSize.small` | optional | Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
color | `string` | `CursorColor.white` | optional | Choose between white and gray (ignored when using custom options)
options | `object` | `see options below` | optional | Override default cursor options

**applyWeb(styleSheetUrl, size, color, delay, options)**
> `(Browser only)` Automatically apply cursors on relevant semantic HTML tags and css selectors in a document.

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
styleSheetUrl | `string` | | required | Href value of the styleSheet that will be inspected (must match the href attribute value from your html/external file)
size | `string` | `CursorSize.small` | optional | Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
color | `string` | `CursorColor.white` | optional | Choose between white and gray (ignored when using custom options)
delay | `number` | `200` | optional | The delay for when cursors will be applied after all elements in the document has been rendered
options | `object` | `see options below` | optional | Override default cursor options

**applySelectorsWeb(styleSheetUrl, selectors, size, color, options)**
> `(Browser only)` Apply cursors on specified css selectors in a document.

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
styleSheetUrl | `string` | | required | Href value of the styleSheet that will be inspected (must match the href attribute value from your html/external file)
selectors | `string` | | required | Selectors that will be inspected
size | `string` | `CursorSize.small` | optional | Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
color | `string` | `CursorColor.white` | optional | Choose between white and gray (ignored when using custom options)
options | `object` | `see options below` | optional | Override default cursor options

### Other arguments
**options**
Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
cursorDir | `string` | `'./web-friendly'` | optional | Directory path containing cursor size folders relative to your root directory (custom cursors should be placed in respective cursor size folder structure eg. 32x32/cursor.png, 64x64/cursor.png and 128x128/cursor.png)
offset | `CursorOffset` | `new CursorOffset(0, 0)` | optional | Changes the cursor hotspot position using x and y from top right corner
default | `string` | `pointer` | optional | Override cursor name
pointer | `string` | `link` | optional | Override cursor name
text | `string` | `beam` | optional | Override cursor name
progress | `string` | `working` | optional | Override cursor name
wait | `string` | `busy` | optional | Override cursor name
allScroll | `string` | `move` | optional | Override cursor name
ewResize | `string` | `horz` | optional | Override cursor name
nsResize | `string` | `vert` | optional | Override cursor name
neswResize | `string` | `dgn2` | optional | Override cursor name
nwseResize | `string` | `dgn1` | optional | Override cursor name

### Classes
**CursorOffset**
> Changes the cursor hotspot position using x and y from top right corner.

Arguments | Type | Default | Priority | Description
--- | --- | --- | --- | ---
x | `number` | `0` | optional | x value in pixels
y | `number` | `0` | optional | y value in pixels
> Methods

- toString()

### Constants
**CursorName**
> common

- default: `pointer`
- pointer: `link`
- text: `beam`
> status

- progress: `working`
- wait: `busy`
> resizing & scrolling

- allScroll: `move`
- ewResize: `horz`
- nsResize: `vert`
- neswResize: `dgn2`
- nwseResize: `dgn1`


**CursorSize**
- small: `32x32`
- medium: `64x64`
- large: `128x128`

**CursorColor**
- white
- gray
