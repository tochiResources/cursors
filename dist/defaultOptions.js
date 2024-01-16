/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

const isBrowser = require(`./check`).isBrowser;
const CursorOffset = require(`./Classes/CursorOffset`);

const defaultOptions = {
    cursorDir: `${__dirname}/web-friendly`.replace("\\", "/"),
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
}

const resolvePath = (path) => {
    const rootPaths = __dirname.replaceAll("\\", "/").split('/');
    rootPaths.pop(); rootPaths.pop(); rootPaths.pop(); // root dir
    if (path.includes("../")) rootPaths.pop();
    const rootPath = rootPaths.join('/');
    return (!path.includes(':') ? `${rootPath}/${path.replace("../", "").replace("./", "")}` : path).replaceAll("\\", "/");
}

const resolveOptions = (options) => {
    if (!options) return defaultOptions;
    if (!options.cursorDir) options.cursorDir = defaultOptions.cursorDir;
    if (!isBrowser) options.cursorDir = resolvePath(options.cursorDir);
    if (!options.default) options.default = defaultOptions.default;
    if (!options.pointer) options.pointer = defaultOptions.pointer;
    if (!options.text) options.text = defaultOptions.text;
    if (!options.progress) options.progress = defaultOptions.progress;
    if (!options.wait) options.wait = defaultOptions.wait;
    if (!options.allScroll) options.allScroll = defaultOptions.allScroll;
    if (!options.ewResize) options.ewResize = defaultOptions.ewResize;
    if (!options.nsResize) options.nsResize = defaultOptions.nsResize;
    if (!options.neswResize) options.neswResize = defaultOptions.neswResize;
    if (!options.nwseResize) options.nwseResize = defaultOptions.nwseResize;
    options.cursorDir = decodeURI(options.cursorDir).replaceAll("\\", "/");
    return options;
}

module.exports = {
    defaultOptions: defaultOptions,
    resolvePath: resolvePath,
    resolveOptions: resolveOptions,
};