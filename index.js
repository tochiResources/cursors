/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

const cursor = require(`./dist/cursor`);
const { isBrowser } = require(`./dist/check`);
const defaultOptions = require(`./dist/defaultOptions`).defaultOptions;
const CursorSize = require(`./dist/Constants/CursorSize`);
const CursorColor = require(`./dist/Constants/CursorColor`);
const CursorOffset = require(`./dist/Classes/CursorOffset`);
let isMultiContext;

/**
 *  Set to `true` if your application is multicontextual eg. supports both NodeJs and Browser contexts at the same time
 *
 * @param {boolean} value Should be used before `apply`, `applyWeb`, `applySelectors` and `applySelectorsWeb`
 */
const multiContext = (value) => { cursor.setMultiContext(value); isMultiContext = value; }

/**
 * `(NodeJs only)` Automatically apply cursors on relevant semantic HTML tags and css selectors in a document
 *
 * @param {string} styleSheetUrl Url of the styleSheet that will be inspected relative to your root directory (accepts absolute path and web url)
 * @param {string} outputFolder Directory path relative to your root directory for the generated css file `tochiResources-cursors.css`
 * @param {string} [size=CursorSize.small] Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
 * @param {string} [color=CursorColor.white] Choose between white and gray
 * @param {number} [delay=200] The delay for when cursors will be applied after all elements in the document has been rendered
 * @param {object} [options=defaultOptions] Override default cursor options
 */
const apply = (styleSheetUrl, outputFolder, size = CursorSize.small, color = CursorColor.white, delay = 200, options = defaultOptions) => {
    if (isBrowser && !isMultiContext) throw new Error("Cannot use 'apply' in current context");
    resolveCursors("apply", [styleSheetUrl, outputFolder, size, color, delay, options], false);
}

/**
 * `(NodeJs only)` Apply cursors on specified css selectors in a document
 *
 * @param {string} styleSheetUrl Url of the styleSheet that will be inspected relative to your root directory (accepts absolute path and web url)
 * @param {string} outputFolder Directory path relative to your root directory for the generated css file `tochiResources-cursors.css`
 * @param {string} selectors Selectors that will be inspected
 * @param {string} [size=CursorSize.small] Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
 * @param {string} [color=CursorColor.white] Choose between white and gray
 * @param {object} [cursorDir=defaultOptions] Override default cursor options
 */
const applySelectors = (styleSheetUrl, outputFolder, selectors, size = CursorSize.small, color = CursorColor.white, options = defaultOptions) => {
    if (isBrowser && !isMultiContext) throw new Error("Cannot use 'applySelectors' in current context");
    resolveCursors("applySelectors", [styleSheetUrl, outputFolder, selectors, size, color, options], false);
}

/**
 * `(Browser only)` Automatically apply cursors on relevant semantic HTML tags and css selectors in a document
 *
 * @param {string} styleSheetUrl Href value of the styleSheet that will be inspected (must match the href attribute value from the html/external file)
 * @param {string} [size=CursorSize.small] Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
 * @param {string} [color=CursorColor.white] Choose between white and gray
 * @param {number} [delay=200] The delay for when cursors will be applied after all elements in the document has been rendered
 * @param {object} [options=defaultOptions] Override default cursor options
 */
const applyWeb = (styleSheetUrl, size = CursorSize.small, color = CursorColor.white, delay = 200, options = defaultOptions) => {
    if (!isBrowser) throw new Error("Cannot use 'applyWeb' in current context");
    resolveCursors("apply", [styleSheetUrl, size, color, delay, options], true);
}

/**
 * `(Browser only)` Apply cursors on specified css selectors in a document
 *
 * @param {string} styleSheetUrl Href value of the styleSheet that will be inspected (must match the href attribute value from the html/external file)
 * @param {string} selectors Selectors that will be inspected
 * @param {string} [size=CursorSize.small] Choose a cursor size between small, medium and large (most browsers won't support cursor sizes above small)
 * @param {string} [color=CursorColor.white] Choose between white and gray
 * @param {object} [cursorDir=defaultOptions] Override default cursor options
 */
const applySelectorsWeb = (styleSheetUrl, selectors, size = CursorSize.small, color = CursorColor.white, options = defaultOptions) => {
    if (!isBrowser) throw new Error("Cannot use 'applySelectorsWeb' in current context");
    resolveCursors("applySelectors", [styleSheetUrl, selectors, size, color, options], true);
}

const resolveCursors = (functionName, args, web) => {
    if (isBrowser) { 
        const htmlName = window.location.pathname.split("/").pop();
        if (document.styleSheets.length < 1) throw new Error(`Could not find any styleSheets in '${htmlName}'`);
    }
    
    switch (functionName) {
        case "apply":
            if (web) cursor.applyWeb(args[0], args[1], args[2], args[3], args[4]);
            else cursor.apply(args[0], args[1], args[2], args[3], args[4], args[5]);
            break;
        case "applySelectors":
            setTimeout(() => { // avoid overlapping
                if (web) cursor.applySelectorsWeb(args[0], args[1], args[2], args[3], args[4], false);
                else cursor.applySelectors(args[0], args[1], args[2], args[3], args[4], args[5], false);
            }, 1000);
            break;
        default: throw new Error(`The function '${functionName}' is not a part of tochiResources cursors API`);
    }
}

module.exports = {
    multiContext: multiContext,
    apply: apply,
    applySelectors: applySelectors,
    applyWeb: applyWeb,
    applySelectorsWeb: applySelectorsWeb,
    CursorSize: CursorSize,
    CursorColor: CursorColor,
    CursorOffset: CursorOffset
}