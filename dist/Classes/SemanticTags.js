/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

/**
 *
 *
 * @class SemanticTags
 */
/*
 * 2024 © tochiResources. All Rights Reserved.
 * tochiResources cursors used in HTML, CSS & JavaScript applications
 */

class SemanticTags {
    static NamesInitial = [
        // the order matters (priority)
        { selector: "body", cursor: "default" },
        { selector: "[type]", cursor: "default" },
        
        { selector: "header", cursor: "default", section: true },
        { selector: "nav", cursor: "default", section: true },
        { selector: "div", cursor: "default", section: true },
        { selector: "main", cursor: "default", section: true },
        { selector: "section", cursor: "default", section: true },
        { selector: "article", cursor: "default", section: true },
        { selector: "aside", cursor: "default", section: true },
        { selector: "footer", cursor: "default", section: true },

        { selector: "details", cursor: "default", section: true },
        { selector: "figure", cursor: "default", section: true },

        { selector: "a", cursor: "pointer" },
        { selector: "p", cursor: "default" },
        { selector: "label", cursor: "default" },
        { selector: "span", cursor: "default" },
        { selector: "h1", cursor: "default" },
        { selector: "h2", cursor: "default" },
        { selector: "h3", cursor: "default" },
        { selector: "h4", cursor: "default" },
        { selector: "h5", cursor: "default" },
        { selector: "h6", cursor: "default" },

        { selector: `input[type="button"]`, cursor: "pointer" },
        { selector: `input[type="checkbox"]`, cursor: "pointer" },
        { selector: `input[type="reset"]`, cursor: "pointer" },
        { selector: `input[type="radio"]`, cursor: "pointer" },
        { selector: `input[type="image"]`, cursor: "pointer" },
        { selector: `input[type="range"]`, cursor: "pointer" },
        { selector: `input[type="submit"]`, cursor: "pointer" },
        
        { selector: "input", cursor: "text" },
        { selector: `input[type="file"]`, cursor: "text" },
        { selector: `input[type="text"]`, cursor: "text" },
        { selector: `input[type="email"]`, cursor: "text" },
        { selector: `input[type="password"]`, cursor: "text" },
        { selector: `input[type="search"]`, cursor: "text" },
        { selector: `input[type="date"]`, cursor: "text" },
        { selector: `input[type="datetime-local"]`, cursor: "text" },
        { selector: `input[type="month"]`, cursor: "text" },
        { selector: `input[type="week"]`, cursor: "text" },
        { selector: `input[type="number"]`, cursor: "text" },
        { selector: `input[type="tel"]`, cursor: "text" },
        { selector: `input[type="time"]`, cursor: "text" },
        { selector: `input[type="url"]`, cursor: "text" },
        
        { selector: "button", cursor: "pointer" }
    ]

    /**
     * Gets an array of semantic tags for cursors
     *
     * @static
     * @memberof SemanticTags
     */
    static Names = () => {
        const names = [];
        this.NamesInitial.forEach(name => {
            if (!name.section) names.push({ selector: name.selector, cursor: name.cursor });
            if (!name.selector.includes("input") && name.cursor !== "default" && !name.section) {
                names.push({ selector: `${name.selector}:hover`, cursor: "pointer" });
            }
        });
        // second iteration because the order matters (prioritized)
        this.NamesInitial.forEach(name => names.push({ selector: `${name.selector}:disabled`, cursor: "default" }));
        return names;
    }

    static toString = () => Names().map(x => x.selector).join(', ');
}

module.exports = SemanticTags;