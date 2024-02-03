import { flattenObject } from "../object";
import { toBoolean, ALLOWED_FALSE_SYMBOLS, ALLOWED_TRUE_SYMBOLS } from "../type";

describe("Parsing module unit testing", () => {
    test.each(ALLOWED_TRUE_SYMBOLS)('Test the boolean parsing fot the default true symbol "$input"', (input) => {
        expect(toBoolean(input)).toBe(true);
    });

    test.each(ALLOWED_FALSE_SYMBOLS)('Test the boolean parsing for the default false symbol "$input"', (input) => {
        expect(toBoolean(input)).toBe(false);
    });

    const testCases = [
        { input: class Foo {}, expected: undefined },
        { input: { what: "ever" }, expected: undefined },
        { input: /.{1,2}/g, expected: undefined },
        { input: [], expected: undefined },
        { input: {}, expected: undefined },
        { input: null, expected: undefined },
        { input: undefined, expected: undefined },
    ];

    test.each(testCases)('Test the boolean parsing for the non-parsable symbol "$input"', ({ input, expected }) => {
        expect(toBoolean(input)).toBe(expected);
    });

    it("Should flatten a deeply nested and fully defined object", () => {
        const testCase = {
            a: {
                b: "red",
                c: "green",
            },
            d: {
                e: "blue",
                f: "yellow",
            },
            g: "pink",
            h: {
                i: {
                    j: {
                        k: "gray",
                        l: "grey",
                    },
                },
            },
        };

        const expected = {
            "a.b": "red",
            "a.c": "green",
            "d.e": "blue",
            "d.f": "yellow",
            g: "pink",
            "h.i.j.k": "gray",
            "h.i.j.l": "grey",
        };

        expect(flattenObject(testCase)).toStrictEqual(expected);
    });

    it("Should flatten a partially defined nested object", () => {
        const testCase = {
            server: { environment: "production", port: undefined },
            foo: undefined,
            bar: {
                keycloak: {
                    clientId: undefined,
                    realmName: undefined,
                    service: { port: 8080 },
                    jwt: { algorithm: "RS256" },
                },
            },
        };

        const expected = {
            "server.environment": "production",
            "server.port": undefined,
            foo: undefined,
            "bar.keycloak.clientId": undefined,
            "bar.keycloak.realmName": undefined,
            "bar.keycloak.service.port": 8080,
            "bar.keycloak.jwt.algorithm": "RS256",
        };

        expect(flattenObject(testCase)).toStrictEqual(expected);
    });
});
