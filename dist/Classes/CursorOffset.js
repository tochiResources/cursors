/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

/**
 *
 *
 * @class CursorOffset
 */
class CursorOffset {
    /**
     * Changes the cursor hotspot position using x and y from top right corner
     * @param {number} [x=0] x value in pixels
     * @param {number} [y=0] y value in pixels
     * @memberof CursorOffset
     */
    constructor(x = 0, y = 0) {
        const validate = () => {
            const isInt = (value) => {
                let x;
                if (isNaN(value)) return false;
                x = parseFloat(value);
                return (x | 0) === x;
            }
            if (!isInt(x)) throw new TypeError(`x must be a valid integer`);
            if (!isInt(y)) throw new TypeError(`y must be a valid integer`);
        }

        validate();

        this.x = x;
        this.y = y;
    }

    /**
     * Returns offset in css format eg. '0 0'
     *
     * @return {string}
     * @memberof CursorOffset
     */
    toString() { return `${this.x} ${this.y}`; }
}

module.exports = CursorOffset;