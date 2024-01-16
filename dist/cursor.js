/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */
const fs = require('fs');
const CssScanner = require(`./scanner`);
const isBrowser = require(`./check`).isBrowser;
const defaultOptions = require(`./defaultOptions`).defaultOptions;
const resolvePath = require(`./defaultOptions`).resolvePath;
const resolveOptions = require(`./defaultOptions`).resolveOptions;
const CursorInfo = require(`./Classes/CursorInfo`);
const SemanticTags = require(`./Classes/SemanticTags`);
const CursorName = require(`./Constants/CursorName`);

const cursors = [];

let CSSOM;
let styleText = "";
let writing;
let multiContext;
const setMultiContext = (value) => {
    if (typeof value !== 'boolean') throw new Error("Value must be a boolean");
    multiContext = value;
}

const generate = (styleSheetUrl, outputFolder, allElements) => {
    if (!styleText || styleText.length < 1) throw new Error(`Could not apply cursors in '${styleSheetUrl}' because of missing cursor property declaration${allElements ? "" : " for specified selectors"}`);
    const styleTagId = 'tochiResources-cursors';
    if (isBrowser) {  // (browser only)
        let styleTag = document.head.querySelector(styleTagId);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.innerHTML = `\n${styleText.trimEnd()}\n`;
            styleTag.id = styleTagId;
            document.head.appendChild(styleTag);
            return;
        }
        styleTag.id = styleTagId;
        styleTag.innerHTML += `\n${styleText.trimEnd()}\n`;
    }
    else {
        outputFolder = outputFolder ? outputFolder.replaceAll("\\", "") : null;
        let originalPath = styleSheetUrl.replaceAll("\\", "/");
        let fileParentDir = originalPath.includes('/') ? `${originalPath.substring(0, originalPath.lastIndexOf('/') + 1)}` : "";
        let filePath = (`${outputFolder ?
            (outputFolder.includes('/') ?
                (outputFolder.lastIndexOf('/') !== outputFolder.length - 1 ? `${outputFolder}/` : outputFolder) : `${outputFolder}/`) :
            fileParentDir}`) + `${styleTagId}.css`;
        let flag = !fs.existsSync(filePath) ? undefined : (fs.statSync(filePath).size > 10 ? 'as+' : undefined);
        fs.mkdirSync(outputFolder, { recursive: true });
        while (!writing) {
            writing = true;
            fs.writeFileSync(filePath, styleText.trim(), { encoding: 'utf-8', flag: allElements ? undefined : flag });
            writing = false; break; 
        }
    }
}

const style_default = { selectors: [], cursorInfo: null };
const style_pointer = { selectors: [], cursorInfo: null };
const style_text = { selectors: [], cursorInfo: null };
const style_progress = { selectors: [], cursorInfo: null };
const style_wait = { selectors: [], cursorInfo: null };
const style_allScroll = { selectors: [], cursorInfo: null };
const style_ewResize = { selectors: [], cursorInfo: null };
const style_nsResize = { selectors: [], cursorInfo: null };
const style_neswResize = { selectors: [], cursorInfo: null };
const style_wseResize = { selectors: [], cursorInfo: null };
const style_unknown = { selectors: [], cursorInfo: null };
const newCursorInfo = (cursorInfo, isSemantic) => {
    const existingCursor = cursors.find(x => x.selectors === cursorInfo.selectors);
    if (!existingCursor) cursors.push(cursorInfo);
    else {
        cursors.splice(cursors.indexOf(existingCursor), 1);
        cursors.push(cursorInfo);
    }
    if (isSemantic) {
        switch (cursorInfo.name) {
            case "default": style_default.selectors.push(cursorInfo.selectors); style_default.cursorInfo = cursorInfo; break;
            case "pointer": style_pointer.selectors.push(cursorInfo.selectors); style_pointer.cursorInfo = cursorInfo; break;
            case "text": style_text.selectors.push(cursorInfo.selectors); style_text.cursorInfo = cursorInfo; break;
            case "progress": style_progress.selectors.push(cursorInfo.selectors); style_progress.cursorInfo = cursorInfo; break;
            case "wait": style_wait.selectors.push(cursorInfo.selectors); style_wait.cursorInfo = cursorInfo; break;
            case "allScroll": style_allScroll.selectors.push(cursorInfo.selectors); style_allScroll.cursorInfo = cursorInfo; break;
            case "ewResize": style_ewResize.selectors.push(cursorInfo.selectors); style_ewResize.cursorInfo = cursorInfo; break;
            case "nsResize": style_nsResize.selectors.push(cursorInfo.selectors); style_nsResize.cursorInfo = cursorInfo; break;
            case "nwseResize": style_neswResize.selectors.push(cursorInfo.selectors); style_neswResize.cursorInfo = cursorInfo; break;
            case "neswResize": style_wseResize.selectors.push(cursorInfo.selectors); style_wseResize.cursorInfo = cursorInfo; break;
            default: style_unknown.selectors.push(cursorInfo.selectors); style_unknown.cursorInfo = cursorInfo; break;
        }
    }
    else styleText += `${cursorInfo.selectors} { cursor: ${cursorInfo} !important; }\n`;
    return cursorInfo;
}

const assignCursor = (selectors, name, size, color, options) => {
    const curorNames = Object.getOwnPropertyNames(CursorName);
    for (var i = 0; i < curorNames.length; i++) {
        if (name.includes(curorNames[i])) {
            return newCursorInfo(new CursorInfo(selectors, name, size, color, options), false);
        }
    }
}

const isUrl = (s) => {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

const validStyleSheetUrl = (styleSheetUrl, inspectAll) => {
    return new Promise(resolve => {
        if (isBrowser) {
            if (styleSheetUrl.includes(':') && !isUrl(styleSheetUrl)) throw new Error(`Invalid file path for styleSheet url '${styleSheetUrl}'`);
            if (!isUrl(styleSheetUrl)) {
                resolve({ url: styleSheetUrl, inspectAll: inspectAll});
                return;
            }
            fetch(styleSheetUrl)
                .then(respone => {
                    if (respone.status === 404) {
                        throw new Error(`Cannot find specified styleSheet url '${styleSheetUrl}' make sure the url is valid`);
                    }
                    else resolve({ url: styleSheetUrl, inspectAll: inspectAll});
                })
                .catch(error => { throw error; });
        }
        else {
            if (!isUrl(styleSheetUrl)) {
                if (!fs.existsSync(styleSheetUrl)) throw new Error(`Cannot find specified styleSheet url '${styleSheetUrl}' make sure the url is valid`);
                else resolve({ url: styleSheetUrl, inspectAll: inspectAll});
                return;
            }
            const tryGenerate = (protocolType) => {
                const prtcl = protocolType === 'https' ? require('https') : require('http');
                prtcl.get(styleSheetUrl, respone => {
                    if (respone.statusCode === 404) { throw new Error(`Cannot find specified styleSheet url '${styleSheetUrl}' make sure the url is valid`); }
                    else resolve({ url: styleSheetUrl, inspectAll: inspectAll});
                }).on('error', err => { throw err });
            }
            try { tryGenerate('https'); }
            catch (error) { 
                try { tryGenerate('http'); }
                catch (err) { throw err; }
            }
        }
    });
}

const getSheet = (styleSheetUrl, allElements, size, color, options) => {
    const getHtmlStyleTags = () => { // (browser only)
        if (!isBrowser) return null;
        const results = [];
        const tags = document.getElementsByTagName('link');
        for (let i = 0; i < tags.length; i++) {
            const linkTag = tags[i];
            if (!linkTag.rel.includes("stylesheet")) continue;
            if (!linkTag.href || linkTag.href.length < 1) continue;
            let name = linkTag.getAttribute('href').replaceAll("\\", "/");
            results.push({
                rel: decodeURI(linkTag.rel.trim()),
                href: decodeURI(linkTag.href.replace("file:///", "").trim()),
                name: decodeURI(name.trim())
            });
        }
        return results;
    }

    let sheetHref;
    // get stylesheet (browser only)
    if (isBrowser && !isUrl(styleSheetUrl)) {
        let styleSheetTags = getHtmlStyleTags();
        for (let i = 0; i < styleSheetTags.length; i++) {
            const styleSheetTag = styleSheetTags[i];
            if (!styleSheetTag.name.includes(styleSheetUrl)) continue;
            if (styleSheetTag.name !== styleSheetUrl) continue;
            sheetHref = styleSheetTag.name;
            CSSOM = document.styleSheets.item(i);
            if (CSSOM) CSSOM = { href: decodeURI(CSSOM.href.replace("file:///", "")) };
            break;
        }
    }
    else CSSOM = { href: styleSheetUrl };

    const htmlName = isBrowser ? window.location.pathname.split("/").pop() : "";
    if (isBrowser) {
        if ((!sheetHref || sheetHref.length < 1) && !isUrl(styleSheetUrl)) throw new Error(`StyleSheet href for '${styleSheetUrl}' is invalid via '${htmlName}'`);
        if (!CSSOM) throw new Error(`Could not find any styleSheet with the name '${styleSheetUrl}' in '${htmlName}'`);
    }
    else if (!CSSOM) throw new Error(`Could not find any styleSheet with the name '${styleSheetUrl}'`);

    styleText = "";
    if (!allElements) return;
    styleText = "/* Semantic tags */\n";
    SemanticTags.Names().forEach(tag => newCursorInfo(new CursorInfo(tag.selector, tag.cursor, size, color, options), true));
    if (style_default.selectors.length > 0) styleText += `${style_default.selectors.join(', ')} { cursor: ${style_default.cursorInfo} !important; }\n`;
    if (style_pointer.selectors.length > 0) styleText += `${style_pointer.selectors.join(', ')} { cursor: ${style_pointer.cursorInfo} !important; }\n`;
    if (style_text.selectors.length > 0) styleText += `${style_text.selectors.join(', ')} { cursor: ${style_text.cursorInfo} !important; }\n`;
    if (style_progress.selectors.length > 0) styleText += `${style_progress.selectors.join(', ')} { cursor: ${style_progress.cursorInfo} !important; }\n`;
    if (style_wait.selectors.length > 0) styleText += `${style_wait.selectors.join(', ')} { cursor: ${style_wait.cursorInfo} !important; }\n`;
    if (style_allScroll.selectors.length > 0) styleText += `${style_allScroll.selectors.join(', ')} { cursor: ${style_allScroll.cursorInfo} !important; }\n`;
    if (style_ewResize.selectors.length > 0) styleText += `${style_ewResize.selectors.join(', ')} { cursor: ${style_ewResize.cursorInfo} !important; }\n`;
    if (style_nsResize.selectors.length > 0) styleText += `${style_nsResize.selectors.join(', ')} { cursor: ${style_nsResize.cursorInfo} !important; }\n`;
    if (style_neswResize.selectors.length > 0) styleText += `${style_neswResize.selectors.join(', ')} { cursor: ${style_neswResize.cursorInfo} !important; }\n`;
    if (style_wseResize.selectors.length > 0) styleText += `${style_wseResize.selectors.join(', ')} { cursor: ${style_wseResize.cursorInfo} !important; }\n`;
    if (style_unknown.selectors.length > 0) styleText += `${style_unknown.selectors.join(', ')} { cursor: ${style_unknown.cursorInfo} !important; }\n`;
    styleText += "/* Custom selectors */\n";
}

// apply tochiResources cursors for all elements in a document
const applyWeb = (styleSheetUrl, size = "small", color = "white", delay = 200, options = defaultOptions) => apply(styleSheetUrl, null, size, color, delay, options);
const apply = (styleSheetUrl, outputFolder, size = "small", color = "white", delay = 200, options = defaultOptions) => {
    let hasSet;
    delay = delay ?? 200;
    // wait until document and it's children has been rendered
    const set = () => setTimeout(() => { applySelectors(styleSheetUrl, outputFolder, '*', size, color, options, true); hasSet = true; }, delay);
    if (isBrowser) {  // (browser only)
        if (document.readyState == 'complete') set();
        else document.onreadystatechange = () => {
            if (hasSet) return;
            if (document.readyState === "complete") set();
        }
    }
    else set();
}

// apply tochiResources cursors for a query of elements in a document
const applySelectorsWeb = (styleSheetUrl, selectors, size = "small", color = "white", options = defaultOptions, allElements = false) => applySelectors(styleSheetUrl, null, selectors, size, color, options, allElements);
const applySelectors = (styleSheetUrl, outputFolder, selectors, size = "small", color = "white", options = defaultOptions, allElements = false) => {
    if (!styleSheetUrl) throw new Error(`styleSheetUrl is invalid`);
    if (!isBrowser && !outputFolder) throw new Error(`outputFolder is invalid`);
    if (!selectors) throw new Error(`selectors are invalid`);
    const checkAllCssRules = selectors === '*';
    const selectorArr = selectors.replace(/^\s+|\s+$/g, '').trim().split(',');
    if (selectorArr.map(x => { if (!allElements && !x.includes('.') && !x.includes('#')) throw new Error(`The selector '${x}' is unsupported. Only classes and ids are allowed`); }));
    
    size = size ?? "small";
    color = color ?? "white";
    options = resolveOptions(options);
    if (!isBrowser) {
        styleSheetUrl = resolvePath(styleSheetUrl);
        outputFolder = resolvePath(outputFolder);
    }
    styleSheetUrl = decodeURI(styleSheetUrl);
    outputFolder = decodeURI(outputFolder);

    validStyleSheetUrl(styleSheetUrl, allElements)
    .then((results) => {
        getSheet(results.url, results.inspectAll, size, color, options);
        const scanCss = (css) => {
            const rules = [];
            const searchSelectors = (s) => checkAllCssRules ? true : new RegExp(selectorArr.join('|')).test(s);
            const scanner = new CssScanner(css);
            scanner.on('rule', function (rule, type) {
                const selectorList = rule.selector.join(', ');
                if (!selectorList || selectorList.length < 1) return;
                if (searchSelectors(selectorList)) {
                    for (var i = 0; i < rule.declaration.length; i++) {
                        const declaration = rule.declaration[i];
                        if (declaration.property === 'cursor') {
                            let selectorsNoHover = selectorList.replaceAll(":hover", "");
                            const selectorsWithHover = selectorsNoHover.includes(',') ? selectorsNoHover.replaceAll(",", ":hover,") + ":hover" : selectorsNoHover + ":hover";
                            const selectorDisabled = selectorsNoHover.includes(',') ? selectorsNoHover.replaceAll(",", ":disabled,") + ":disabled" : selectorsNoHover + ":disabled";
                            assignCursor(selectorsNoHover, declaration.value, size, color, options);
                            assignCursor(selectorsWithHover, declaration.value, size, color, options);
                            assignCursor(selectorDisabled, "default", size, color, options);
                        }
                    }
                }
                rules.push(0);
            });
            scanner.scan();
    
            if (rules.length == 0) {
                if (checkAllCssRules)
                    throw new Error(`Cannot find selectors with a cursor property in '${CSSOM.href}'`);
            }
        }
    
        if (isUrl(CSSOM.href)) {
            if (isBrowser) {
                fetch(CSSOM.href)
                    .then(respone => {
                        respone.text()
                            .then(cssFileContent => {
                                if (!cssFileContent) throw new Error("Could not fetch css file: " + CSSOM.href);
                                scanCss(cssFileContent);
                                generate(results.url, outputFolder, results.inspectAll);
                            })
                            .catch(error => { throw error; });
                    })
                    .catch(error => { throw error; });
            }
            else {
                const tryGenerate = (protocolType) => {
                    const prtcl = protocolType === 'https' ? require('https') : require('http');
                    prtcl.get(CSSOM.href, respone => {
                        let cssFileContent = '';
                        respone.setEncoding('utf-8');
                        respone.on('data', chunk => cssFileContent += chunk);
                        respone.on('end', () => {
                            if (!cssFileContent) throw new Error("Could not fetch css file: " + CSSOM.href);
                            scanCss(cssFileContent);
                            generate(results.url, outputFolder, results.inspectAll);
                        });
                    }).on('error', err => { throw err });
                }
                try { tryGenerate('https'); }
                catch (error) { tryGenerate('http'); }
            }
        }
        else {
            if (!multiContext && isBrowser) throw new Error(`Invalid file path for styleSheet url '${CSSOM.href}' try enabling 'multiContext' if your application is multicontextual`);
            let cssFileContent = fs.readFileSync(CSSOM.href, 'utf-8');
            if (!cssFileContent) throw new Error("Could not fetch css file: " + CSSOM.href);
            scanCss(cssFileContent);
            generate(results.url, outputFolder, results.inspectAll);
        }
    });
}

module.exports = {
    isBrowser: isBrowser,
    multiContext: multiContext,
    setMultiContext: setMultiContext,
    apply: apply, // NodeJs
    applySelectors: applySelectors,
    applyWeb: applyWeb, // Web
    applySelectorsWeb: applySelectorsWeb,
}