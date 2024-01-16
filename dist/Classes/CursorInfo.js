/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

const defaultOptions = require("../defaultOptions").defaultOptions;
const CursorName = require("../Constants/CursorName");
const CursorSize = require("../Constants/CursorSize");
const CursorColor = require("../Constants/CursorColor");

/**
 *
 *
 * @class CursorInfo
 */
class CursorInfo {
    /**
     * 
     * @param {string} [selectors]
     * @param {string} [name=CursorName.default]
     * @param {string} [size=CursorSize.small]
     * @param {string} [color=CursorColor.white]
     * @param {object} [options=defaultOptions]
     * @memberof CursorInfo
     */
    constructor(selectors, name, size, color, options) {
        const isDefaultOptions = options === defaultOptions;

        let getRealName;
        switch (name) {
            // common
            case "default": getRealName = options.default.name; break;
            case "pointer": getRealName = options.pointer.name; break;
            case "text": getRealName = options.text.name; break;

            // status
            case "progress": getRealName = options.progress.name; break;
            case "wait": getRealName = options.wait.name; break;

            // resizing & scrolling
            case "allScroll": getRealName = options.allScroll.name; break;
            case "ewResize": getRealName = options.ewResize.name; break;
            case "nsResize": getRealName = options.nsResize.name; break;
            case "neswResize": getRealName = options.neswResize.name; break;
            case "nwseResize": getRealName = options.nwseResize.name; break;

            default: throw new Error(`Cannot find cursor file name for '${name}'`);
        }

        const validate = () => {
            if (typeof selectors !== 'string') throw new TypeError(`selectors must be typeof 'string' but is ${typeof selectors}`);
            if (typeof name !== 'string') throw new TypeError(`name must be typeof 'string' but is ${typeof name}`);
            if (typeof size !== 'string') throw new TypeError(`size must be typeof 'string' but is ${typeof size}`);
            if (typeof color !== 'string') throw new TypeError(`color must be typeof 'string' but is ${typeof color}`);
            if (typeof options.cursorDir !== 'string') throw new TypeError(`cursorDir must be typeof 'string' but is ${typeof options.cursorDir}`);
            else {
                switch (name) {
                    case "default":
                    case "pointer":
                    case "text":
                    case "progress":
                    case "wait":
                    case "allScroll":
                    case "ewResize":
                    case "nsResize":
                    case "neswResize":
                    case "nwseResize": break;
                    default: throw new Error(`The cursor name '${name}' is unsupported\nPlease make sure to use a name from CursorName`);
                }
            }
            if (typeof size !== 'string') throw new TypeError(`size must be typeof 'string'`);
            else {
                switch (size) {
                    case CursorSize.small:
                    case CursorSize.medium:
                    case CursorSize.large: break;
                    default: throw new Error(`The cursor size '${size}' is unsupported\nPlease make sure to use a size from CursorSize`);
                }
            }
            if (typeof color !== 'string' && isDefaultOptions) throw new TypeError(`color must be typeof 'string'`);
            else if (isDefaultOptions) {
                switch (color) {
                    case CursorColor.white:
                    case CursorColor.gray: break;
                    default: throw new Error(`The cursor color '${color}' is unsupported\nPlease make sure to use a color from CursorColor`);
                }
            }
        }

        validate();

        const getOffset = () => {
            const offset = (x, y) => {
                switch (size) {
                    case CursorSize.small: return `${x} ${y}`;
                    case CursorSize.medium: return `${x = (x * 2)} ${y = (y * 2)}`;
                    case CursorSize.large: return `${x = (x * 4)} ${y = (y * 4)}`;
                }
                return new CursorOffset(x, y);
            }

            switch (name) {
                case "default": return offset(options.default.offset.x, options.default.offset.y);
                case "pointer": return offset(options.pointer.offset.x, options.pointer.offset.y);
                case "text": return offset(options.text.offset.x, options.text.offset.y);
                case "progress": return offset(options.progress.offset.x, options.progress.offset.y);
                case "wait": return offset(options.wait.offset.x, options.wait.offset.y);
                case "allScroll": return offset(options.allScroll.offset.x, options.allScroll.offset.y);
                case "ewResize": return offset(options.ewResize.offset.x, options.ewResize.offset.y);
                case "nsResize": return offset(options.nsResize.offset.x, options.nsResize.offset.y);
                case "nwseResize": return offset(options.nwseResize.offset.x, options.nwseResize.offset.y);
                case "neswResize": return offset(options.neswResize.offset.x, options.neswResize.offset.y);
                default: return offset(0, 0);
            }
        }

        let url = options.cursorDir.replaceAll("\\", "/");
        const cursorColor = isDefaultOptions ? (color == "white" ? "" : color) : "";

        switch (size) {
            case "s":
            case "small": url = `${url}/32x32/${cursorColor}${getRealName}.png`; break;
            case "m":
            case "medium": url = `${url}/64x64/${cursorColor}${getRealName}.png`; break;
            case "l":
            case "large": url = `${url}/128x128/${cursorColor}${getRealName}.png`; break;
            default: url = `${url}/32x32/${cursorColor}${getRealName}.png`; break;
        }

        this.selectors = selectors;
        this.name = name;
        this.url = url;
        this.size = size;
        this.offset = getOffset();
        this.fallback = "auto";
        this.color = color;
        this.style = `url("${this.url}") ${this.offset}, ${this.fallback}`;
    }

    toString() { return this.style; }
}

module.exports = CursorInfo;