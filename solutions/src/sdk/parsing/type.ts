export const ALLOWED_TRUE_SYMBOLS = [true, "true", "verdadeiro", "wahr", 1, "y", "s", "sim", "yes", "ja"];
export const ALLOWED_FALSE_SYMBOLS = [false, "false", "falso", "falsch", 0, "n", "não", "nao", "no", "nein"];

const utf8ToHexStr = (str: string): string => {
    return Array.from(str)
        .map((c) =>
            c.charCodeAt(0) < 128
                ? c.charCodeAt(0).toString(16)
                : encodeURIComponent(c).replace(/\%/g, "").toLowerCase(),
        )
        .join("");
};

const hexStrToUtf8 = (hex: { match: (arg0: RegExp) => string[] }): string => {
    return decodeURIComponent("%" + hex.match(/.{1,2}/g).join("%"));
};

const toBoolean = (value: unknown): boolean | undefined => {
    const testInclusion = (test: string | number): boolean | undefined => {
        if (ALLOWED_TRUE_SYMBOLS.some((v) => v === test)) return true;
        if (ALLOWED_FALSE_SYMBOLS.some((v) => v === test)) return false;

        return;
    };

    // Here, the only types of interest to
    // be parsed into a boolean are
    // string | number | boolean
    switch (typeof value) {
        case "string":
            const test = value.toLowerCase();
            return testInclusion(test);
        case "number":
            return testInclusion(value);
        case "boolean":
            return value;
        default:
            return;
    }
};

export { toBoolean, utf8ToHexStr, hexStrToUtf8 };
