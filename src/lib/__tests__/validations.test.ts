/**
 * Unit tests for validation functions
 */

import { describe, expect, test } from "vitest";
import { ERROR_MESSAGES } from "../constants";
import type { FoodData, MacroData } from "../types";
import {
	getFirstValidationError,
	hasValidationErrors,
	isNonEmptyString,
	isPositiveNumber,
	isValidNumber,
	sanitizeNumericInput,
	sanitizeStringInput,
	validateCookingRatio,
	validateFoodData,
	validateFoodName,
	validateMacroData,
	validateMacroValue,
	validateWeight,
	validateWeightUnit,
} from "../validations";

describe("Basic validation helpers", () => {
	describe("isPositiveNumber", () => {
		test("returns true for positive numbers", () => {
			expect(isPositiveNumber(1)).toBe(true);
			expect(isPositiveNumber(0.1)).toBe(true);
			expect(isPositiveNumber(100)).toBe(true);
		});

		test("returns false for zero and negative numbers", () => {
			expect(isPositiveNumber(0)).toBe(false);
			expect(isPositiveNumber(-1)).toBe(false);
			expect(isPositiveNumber(-0.1)).toBe(false);
		});

		test("returns false for non-numbers", () => {
			expect(isPositiveNumber("5")).toBe(false);
			expect(isPositiveNumber(null)).toBe(false);
			expect(isPositiveNumber(undefined)).toBe(false);
			expect(isPositiveNumber(NaN)).toBe(false);
		});
	});

	describe("isValidNumber", () => {
		test("returns true for valid numbers including zero", () => {
			expect(isValidNumber(0)).toBe(true);
			expect(isValidNumber(1)).toBe(true);
			expect(isValidNumber(-1)).toBe(true);
			expect(isValidNumber(0.5)).toBe(true);
		});

		test("returns false for invalid numbers", () => {
			expect(isValidNumber(NaN)).toBe(false);
			expect(isValidNumber(Infinity)).toBe(false);
			expect(isValidNumber(-Infinity)).toBe(false);
			expect(isValidNumber("5")).toBe(false);
			expect(isValidNumber(null)).toBe(false);
		});
	});

	describe("isNonEmptyString", () => {
		test("returns true for non-empty strings", () => {
			expect(isNonEmptyString("hello")).toBe(true);
			expect(isNonEmptyString("  hello  ")).toBe(true);
			expect(isNonEmptyString("a")).toBe(true);
		});

		test("returns false for empty or whitespace-only strings", () => {
			expect(isNonEmptyString("")).toBe(false);
			expect(isNonEmptyString("   ")).toBe(false);
			expect(isNonEmptyString("\t\n")).toBe(false);
		});

		test("returns false for non-strings", () => {
			expect(isNonEmptyString(5)).toBe(false);
			expect(isNonEmptyString(null)).toBe(false);
			expect(isNonEmptyString(undefined)).toBe(false);
		});
	});
});

describe("Weight validation", () => {
	describe("validateWeight", () => {
		test("returns null for valid positive weights", () => {
			expect(validateWeight(100, "weight")).toBeNull();
			expect(validateWeight(0.1, "weight")).toBeNull();
			expect(validateWeight(1000, "weight")).toBeNull();
		});

		test("returns error for zero weight", () => {
			expect(validateWeight(0, "weight")).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
		});

		test("returns error for negative weights", () => {
			expect(validateWeight(-5, "weight")).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
			expect(validateWeight(-0.1, "weight")).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
		});

		test("returns error for invalid numbers", () => {
			expect(validateWeight(NaN, "weight")).toBe(ERROR_MESSAGES.INVALID_NUMBER);
			expect(validateWeight(Infinity, "weight")).toBe(
				ERROR_MESSAGES.INVALID_NUMBER,
			);
		});
	});
});

describe("Macro validation", () => {
	describe("validateMacroValue", () => {
		test("returns null for valid macro values including zero", () => {
			expect(validateMacroValue(0, "calories")).toBeNull();
			expect(validateMacroValue(100, "protein")).toBeNull();
			expect(validateMacroValue(0.5, "fat")).toBeNull();
		});

		test("returns error for negative values", () => {
			expect(validateMacroValue(-1, "calories")).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
			expect(validateMacroValue(-0.1, "protein")).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
		});

		test("returns error for invalid numbers", () => {
			expect(validateMacroValue(NaN, "calories")).toBe(
				ERROR_MESSAGES.INVALID_NUMBER,
			);
			expect(validateMacroValue(Infinity, "protein")).toBe(
				ERROR_MESSAGES.INVALID_NUMBER,
			);
		});
	});

	describe("validateMacroData", () => {
		test("returns empty errors object for valid macro data", () => {
			const validMacros: MacroData = {
				calories: 200,
				protein: 25,
				carbohydrates: 0,
				fat: 10,
				fiber: 2,
			};
			const errors = validateMacroData(validMacros);
			expect(Object.keys(errors)).toHaveLength(0);
		});

		test("returns errors for invalid macro values", () => {
			const invalidMacros: MacroData = {
				calories: -100,
				protein: NaN,
				carbohydrates: 5,
				fat: -2,
				fiber: Infinity,
			};
			const errors = validateMacroData(invalidMacros);

			expect(errors.calories).toBe(ERROR_MESSAGES.POSITIVE_NUMBER_ONLY);
			expect(errors.protein).toBe(ERROR_MESSAGES.INVALID_NUMBER);
			expect(errors.carbohydrates).toBeUndefined();
			expect(errors.fat).toBe(ERROR_MESSAGES.POSITIVE_NUMBER_ONLY);
			expect(errors.fiber).toBe(ERROR_MESSAGES.INVALID_NUMBER);
		});
	});
});

describe("Cooking ratio validation", () => {
	describe("validateCookingRatio", () => {
		test("returns null for valid cooking ratios", () => {
			expect(validateCookingRatio(200, 150)).toBeNull();
			expect(validateCookingRatio(100, 100)).toBeNull();
			expect(validateCookingRatio(500, 300)).toBeNull();
		});

		test("returns error when cooked weight exceeds raw weight", () => {
			expect(validateCookingRatio(100, 120)).toBe(
				ERROR_MESSAGES.COOKED_EXCEEDS_RAW,
			);
			expect(validateCookingRatio(200, 250)).toBe(
				ERROR_MESSAGES.COOKED_EXCEEDS_RAW,
			);
		});

		test("returns error for invalid raw weight", () => {
			expect(validateCookingRatio(-100, 80)).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
			expect(validateCookingRatio(0, 80)).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
		});

		test("returns error for invalid cooked weight", () => {
			expect(validateCookingRatio(100, -80)).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
			expect(validateCookingRatio(100, 0)).toBe(
				ERROR_MESSAGES.POSITIVE_NUMBER_ONLY,
			);
		});
	});
});

describe("Food name validation", () => {
	describe("validateFoodName", () => {
		test("returns null for valid food names", () => {
			expect(validateFoodName("Chicken Breast")).toBeNull();
			expect(validateFoodName("Rice")).toBeNull();
			expect(validateFoodName("  Salmon  ")).toBeNull();
		});

		test("returns error for empty or whitespace-only names", () => {
			expect(validateFoodName("")).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
			expect(validateFoodName("   ")).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
			expect(validateFoodName("\t\n")).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
		});
	});
});

describe("Complete food data validation", () => {
	describe("validateFoodData", () => {
		const validFoodData: FoodData = {
			name: "Chicken Breast",
			rawWeight: 200,
			rawWeightUnit: "g",
			cookedWeight: 150,
			cookedWeightUnit: "g",
			rawMacros: {
				calories: 220,
				protein: 41,
				carbohydrates: 0,
				fat: 5,
				fiber: 0,
			},
		};

		test("returns empty errors for valid food data", () => {
			const errors = validateFoodData(validFoodData);
			const errorValues = Object.values(errors).filter(
				(error) => error !== null,
			);
			expect(errorValues).toHaveLength(0);
		});

		test("returns errors for invalid food data", () => {
			const invalidFoodData: FoodData = {
				name: "",
				rawWeight: -100,
				rawWeightUnit: "g",
				cookedWeight: 200, // exceeds raw weight
				cookedWeightUnit: "g",
				rawMacros: {
					calories: -50,
					protein: NaN,
					carbohydrates: 10,
					fat: 5,
					fiber: 2,
				},
			};

			const errors = validateFoodData(invalidFoodData);

			expect(errors.name).toBe(ERROR_MESSAGES.REQUIRED_FIELD);
			expect(errors.rawWeight).toBe(ERROR_MESSAGES.POSITIVE_NUMBER_ONLY);
			expect(errors.calories).toBe(ERROR_MESSAGES.POSITIVE_NUMBER_ONLY);
			expect(errors.protein).toBe(ERROR_MESSAGES.INVALID_NUMBER);
		});

		test("validates cooking ratio when weights are valid", () => {
			const foodDataWithInvalidRatio: FoodData = {
				...validFoodData,
				rawWeight: 100,
				cookedWeight: 150, // exceeds raw weight
			};

			const errors = validateFoodData(foodDataWithInvalidRatio);
			expect(errors.cookingRatio).toBe(ERROR_MESSAGES.COOKED_EXCEEDS_RAW);
		});
	});
});

describe("Input sanitization", () => {
	describe("sanitizeStringInput", () => {
		test("trims whitespace from strings", () => {
			expect(sanitizeStringInput("  hello  ")).toBe("hello");
			expect(sanitizeStringInput("\t\ntest\n\t")).toBe("test");
			expect(sanitizeStringInput("normal")).toBe("normal");
		});
	});

	describe("sanitizeNumericInput", () => {
		test("returns numbers as-is", () => {
			expect(sanitizeNumericInput(5)).toBe(5);
			expect(sanitizeNumericInput(0.5)).toBe(0.5);
			expect(sanitizeNumericInput(-2)).toBe(-2);
		});

		test("parses valid numeric strings", () => {
			expect(sanitizeNumericInput("5")).toBe(5);
			expect(sanitizeNumericInput("0.5")).toBe(0.5);
			expect(sanitizeNumericInput("-2")).toBe(-2);
			expect(sanitizeNumericInput("  10  ")).toBe(10);
		});

		test("returns 0 for invalid numeric strings", () => {
			expect(sanitizeNumericInput("abc")).toBe(0);
			expect(sanitizeNumericInput("")).toBe(0);
			expect(sanitizeNumericInput("not a number")).toBe(0);
		});
	});
});

describe("Validation error utilities", () => {
	describe("hasValidationErrors", () => {
		test("returns false when no errors exist", () => {
			expect(hasValidationErrors({})).toBe(false);
			expect(hasValidationErrors({ field1: null, field2: null })).toBe(false);
		});

		test("returns true when errors exist", () => {
			expect(hasValidationErrors({ field1: "Error message" })).toBe(true);
			expect(hasValidationErrors({ field1: null, field2: "Error" })).toBe(true);
		});
	});

	describe("getFirstValidationError", () => {
		test("returns null when no errors exist", () => {
			expect(getFirstValidationError({})).toBeNull();
			expect(getFirstValidationError({ field1: null })).toBeNull();
		});

		test("returns first error message when errors exist", () => {
			const errors = {
				field1: null,
				field2: "First error",
				field3: "Second error",
			};
			expect(getFirstValidationError(errors)).toBe("First error");
		});
	});
});

describe("Weight unit validation", () => {
	describe("validateWeightUnit", () => {
		test("returns true for valid weight units", () => {
			expect(validateWeightUnit("g")).toBe(true);
			expect(validateWeightUnit("oz")).toBe(true);
			expect(validateWeightUnit("lb")).toBe(true);
			expect(validateWeightUnit("kg")).toBe(true);
		});

		test("returns false for invalid weight units", () => {
			expect(validateWeightUnit("grams")).toBe(false);
			expect(validateWeightUnit("pounds")).toBe(false);
			expect(validateWeightUnit("invalid")).toBe(false);
			expect(validateWeightUnit("")).toBe(false);
		});
	});
});
