import { test, expect, describe } from "vitest";
import { calculate as calculateExponentiation } from "./mod-exponentiation";
import { calculate as calculateInverse } from "./mod-inverse";
import { getDividers } from "./get-dividers";
import { gcd } from "./gcd";
import { mod } from "./mod";
import { diffieHellman } from "./diffie-hellman";

describe("mod", () => {
    test("calculates mod with positive numbers", () => {
        expect(mod(10, 3)).toBe(1);
    });

    test("calculates mod with negative numbers", () => {
        expect(mod(-10, 3)).toBe(2);
    });

    test("calculates mod with zero", () => {
        expect(mod(10, 0)).toBeNaN();
    });

    test("calculates mod with negative divisor", () => {
        expect(mod(10, -3)).toBe(-2);
    });

    test("calculates mod with both negative", () => {
        expect(mod(-10, -3)).toBe(-1);
    }); 
});

describe("modular exponentiation", () => {
    test("calculates modular exponentiation with positive base", () => {
        expect(calculateExponentiation(27, 11, 7)).toBe(6);
    });


    test("calculates modular exponentiation with negative base", () => {
        expect(calculateExponentiation(-27, 4, 7)).toBe(1);
    });


    test("calculates modular exponentiation with zero exponent", () => {
        expect(calculateExponentiation(27, 0, 7)).toBe(1);
    });


    test("calculates modular exponentiation with no values", () => {
        expect(calculateExponentiation("", "", 3)).toBeNull();
    });

    test("calculates modular exponentiation with big values", () => {
        expect(calculateExponentiation(1000000, 1000000, 13)).toBe(1);
    });
});


describe("modular inverse", () => {
    test("calculates modular inverse", () => {
        expect(calculateInverse(17, 13)).toBe(10);
    });

    test("calculates modular inverse", () => {
        expect(calculateInverse(27, 10)).toBe(3);
    });

    test("calculates modular inverse with error", () => {
        expect(calculateInverse(4, 6)).toBeNull();
    });

});


describe("get dividers", () => {
    test("calculates dividers", () => {
        expect(getDividers(12)).toEqual([2, 2, 3]);
    });

    test("calculates dividers with prime number", () => {
        expect(getDividers(13)).toEqual([13]);
    });

    test("calculates dividers with 1", () => {
        expect(getDividers(1)).toEqual([]);
    });

    test("calculates dividers with no value", () => {
        expect(getDividers("")).toBeNull();
    });

    test("calculates dividers with big value", () => {
        expect(getDividers(1000000)).toEqual([2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5]);
    })

    test("calculates dividers with prime number", () => {
        expect(getDividers(146)).toEqual([2, 73]);
    });

})


describe("gcd", () => {
    test("calculates gcd", () => {
        expect(gcd(24, 48)).toBe(24);
        expect(gcd(48, 18)).toBe(6);
        expect(gcd(56, 98)).toBe(14);
        expect(gcd(101, 10)).toBe(1); 
        expect(gcd(216, 48)).toBe(24);
    });

    test("calculates gcd with one number being one", () => {
        expect(gcd(1, 5)).toBe(1);
    });

    test("calculates gcd with prime numbers", () => {
        expect(gcd(13, 17)).toBe(1);
    });

    test("calculates gcd with one number being zero", () => {
        expect(gcd(0, 5)).toBe(5);
    });

    test("calculates gcd with both numbers being zero", () => {
        expect(gcd(0, 0)).toBe(0);
    });

    test("calculates gcd with negative numbers", () => {
        expect(gcd(-48, -18)).toBe(6);
    });
})


describe("diffie-hellman", () => {
    test("should compute correct public keys and shared secret (basic example)", () => {
        expect(diffieHellman(23, 5, 6, 15)).toEqual({ A: 8, B: 19, s: 2 });
    });

    test("should produce the same shared secret for both parties", () => {
        const result = diffieHellman(23, 5, 6, 15);
        expect(result!.s).toBe(2);
    });

    test("should work with different parameters", () => {
        expect(diffieHellman(29, 2, 4, 10)).toEqual({ A: 16, B: 9, s: 7 });
    });

    test("should handle minimal valid values", () => {
        expect(diffieHellman(5, 2, 1, 1)).toEqual({
            A: 2,
            B: 2,
            s: 2
        });
    });

    test("should handle large exponents", () => {
        const result = diffieHellman(23, 5, 123, 456);
        expect(result!.A).toBeDefined();
        expect(result!.B).toBeDefined();
        expect(result!.s).toBeDefined();
    });

    test("should return equal public keys when private keys are equal", () => {
        const result = diffieHellman(23, 5, 7, 7);
        expect(result!.A).toBe(result!.B);
    });

    test("should handle degenerate case when g = 1", () => {
        const result = diffieHellman(23, 1, 6, 15);
        expect(result).toEqual({
            A: 1,
            B: 1,
            s: 1
        });
    });
});
