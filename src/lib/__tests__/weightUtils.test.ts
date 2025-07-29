import { describe, expect, test } from "vitest";
import {
	convertWeight,
	formatWeight,
	getAllWeightConversions,
} from "../weightUtils";

describe("Weight Conversion Utilities", () => {
	describe("convertWeight", () => {
		test("converts grams to ounces correctly", () => {
			expect(convertWeight(100, "g", "oz")).toBeCloseTo(3.5274, 4);
		});

		test("converts ounces to grams correctly", () => {
			expect(convertWeight(1, "oz", "g")).toBeCloseTo(28.3495, 4);
		});

		test("converts pounds to kilograms correctly", () => {
			expect(convertWeight(2.2, "lb", "kg")).toBeCloseTo(1, 2);
		});

		test("returns same value for same unit conversion", () => {
			expect(convertWeight(100, "g", "g")).toBe(100);
		});

		test("throws error for unsupported unit", () => {
			// biome-ignore lint/suspicious/noExplicitAny: Testing
			expect(() => convertWeight(100, "invalid" as any, "g")).toThrow();
		});
	});

	describe("getAllWeightConversions", () => {
		test("returns all conversions for grams", () => {
			const conversions = getAllWeightConversions(100, "g");

			expect(conversions.grams).toBe(100);
			expect(conversions.ounces).toBeCloseTo(3.5274, 4);
			expect(conversions.pounds).toBeCloseTo(0.220462, 4);
			expect(conversions.kilograms).toBe(0.1);
		});

		test("returns all conversions for ounces", () => {
			const conversions = getAllWeightConversions(1, "oz");

			expect(conversions.grams).toBeCloseTo(28.3495, 4);
			expect(conversions.ounces).toBe(1);
			expect(conversions.pounds).toBeCloseTo(0.0625, 4);
			expect(conversions.kilograms).toBeCloseTo(0.0283495, 4);
		});
	});

	describe("formatWeight", () => {
		test("formats weight to 2 decimal places", () => {
			expect(formatWeight(Math.PI)).toBe(3.14);
			expect(formatWeight(100.999)).toBe(101);
			expect(formatWeight(0.001)).toBe(0);
		});
	});
});
