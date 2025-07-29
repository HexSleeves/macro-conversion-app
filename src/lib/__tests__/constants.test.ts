import { describe, expect, test } from "vitest";
import {
	ERROR_MESSAGES,
	STORAGE_KEYS,
	WEIGHT_CONVERSIONS,
	WEIGHT_UNIT_LABELS,
} from "../constants";

describe("Constants", () => {
	describe("WEIGHT_CONVERSIONS", () => {
		test("contains all required conversion factors", () => {
			expect(WEIGHT_CONVERSIONS.GRAMS_TO_OUNCES).toBe(0.035274);
			expect(WEIGHT_CONVERSIONS.OUNCES_TO_GRAMS).toBe(28.3495);
			expect(WEIGHT_CONVERSIONS.GRAMS_TO_POUNDS).toBe(0.00220462);
			expect(WEIGHT_CONVERSIONS.POUNDS_TO_GRAMS).toBe(453.592);
			expect(WEIGHT_CONVERSIONS.GRAMS_TO_KILOGRAMS).toBe(0.001);
			expect(WEIGHT_CONVERSIONS.KILOGRAMS_TO_GRAMS).toBe(1000);
		});
	});

	describe("ERROR_MESSAGES", () => {
		test("contains all required error messages", () => {
			expect(ERROR_MESSAGES.REQUIRED_FIELD).toBe("This field is required");
			expect(ERROR_MESSAGES.POSITIVE_NUMBER_ONLY).toBe(
				"Please enter a positive number",
			);
			expect(ERROR_MESSAGES.COOKED_EXCEEDS_RAW).toBe(
				"Cooked weight cannot be greater than raw weight",
			);
			expect(ERROR_MESSAGES.INVALID_NUMBER).toBe("Please enter a valid number");
			expect(ERROR_MESSAGES.STORAGE_ERROR).toBe(
				"Unable to save data. Please try again.",
			);
		});
	});

	describe("WEIGHT_UNIT_LABELS", () => {
		test("contains all weight unit labels", () => {
			expect(WEIGHT_UNIT_LABELS.g).toBe("grams");
			expect(WEIGHT_UNIT_LABELS.oz).toBe("ounces");
			expect(WEIGHT_UNIT_LABELS.lb).toBe("pounds");
			expect(WEIGHT_UNIT_LABELS.kg).toBe("kilograms");
		});
	});

	describe("STORAGE_KEYS", () => {
		test("contains storage keys", () => {
			expect(STORAGE_KEYS.SAVED_FOODS).toBe("macro-calculator-saved-foods");
		});
	});
});
