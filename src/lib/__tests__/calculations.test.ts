import { describe, expect, test } from "vitest";
import {
	adjustMacrosForCooking,
	calculateCookingLoss,
	calculateNutrientDensity,
	convertWeight,
	formatMacroData,
	formatMacroValue,
} from "../calculations";
import type { MacroData } from "../types";

describe("Calculation Functions", () => {
	describe("calculateCookingLoss", () => {
		test("calculates cooking loss percentage correctly", () => {
			expect(calculateCookingLoss(200, 150)).toBe(25);
			expect(calculateCookingLoss(100, 80)).toBe(20);
			expect(calculateCookingLoss(500, 400)).toBe(20);
		});

		test("returns 0 when no cooking loss", () => {
			expect(calculateCookingLoss(100, 100)).toBe(0);
		});

		test("handles decimal weights", () => {
			expect(calculateCookingLoss(150.5, 120.4)).toBeCloseTo(20, 1);
		});

		test("throws error for invalid raw weight", () => {
			expect(() => calculateCookingLoss(0, 50)).toThrow(
				"Raw weight must be greater than 0",
			);
			expect(() => calculateCookingLoss(-10, 50)).toThrow(
				"Raw weight must be greater than 0",
			);
		});

		test("throws error for negative cooked weight", () => {
			expect(() => calculateCookingLoss(100, -10)).toThrow(
				"Cooked weight cannot be negative",
			);
		});

		test("throws error when cooked weight exceeds raw weight", () => {
			expect(() => calculateCookingLoss(100, 150)).toThrow(
				"Cooked weight cannot be greater than raw weight",
			);
		});
	});

	describe("adjustMacrosForCooking", () => {
		const sampleMacros: MacroData = {
			calories: 220,
			protein: 41,
			carbohydrates: 0,
			fat: 5,
			fiber: 0,
		};

		test("adjusts macros correctly for same units", () => {
			const adjusted = adjustMacrosForCooking(sampleMacros, 200, "g", 150, "g");

			expect(adjusted.calories).toBe(165); // 220 * (150/200)
			expect(adjusted.protein).toBe(30.75); // 41 * (150/200)
			expect(adjusted.carbohydrates).toBe(0);
			expect(adjusted.fat).toBe(3.75); // 5 * (150/200)
			expect(adjusted.fiber).toBe(0);
		});

		test("adjusts macros correctly for different units", () => {
			// 200g raw to 5.29oz cooked (approximately 150g)
			const adjusted = adjustMacrosForCooking(
				sampleMacros,
				200,
				"g",
				5.29,
				"oz",
			);

			expect(adjusted.calories).toBeCloseTo(165, 0);
			expect(adjusted.protein).toBeCloseTo(30.75, 1);
			expect(adjusted.fat).toBeCloseTo(3.75, 1);
		});

		test("handles no cooking loss (same weight)", () => {
			const adjusted = adjustMacrosForCooking(sampleMacros, 200, "g", 200, "g");

			expect(adjusted.calories).toBe(220);
			expect(adjusted.protein).toBe(41);
			expect(adjusted.carbohydrates).toBe(0);
			expect(adjusted.fat).toBe(5);
			expect(adjusted.fiber).toBe(0);
		});

		test("handles zero cooked weight", () => {
			const adjusted = adjustMacrosForCooking(sampleMacros, 200, "g", 0, "g");

			expect(adjusted.calories).toBe(0);
			expect(adjusted.protein).toBe(0);
			expect(adjusted.carbohydrates).toBe(0);
			expect(adjusted.fat).toBe(0);
			expect(adjusted.fiber).toBe(0);
		});

		test("throws error for invalid raw weight", () => {
			expect(() =>
				adjustMacrosForCooking(sampleMacros, 0, "g", 100, "g"),
			).toThrow("Raw weight must be greater than 0");
			expect(() =>
				adjustMacrosForCooking(sampleMacros, -10, "g", 100, "g"),
			).toThrow("Raw weight must be greater than 0");
		});

		test("throws error for negative cooked weight", () => {
			expect(() =>
				adjustMacrosForCooking(sampleMacros, 200, "g", -10, "g"),
			).toThrow("Cooked weight cannot be negative");
		});
	});

	describe("calculateNutrientDensity", () => {
		const sampleMacros: MacroData = {
			calories: 220,
			protein: 41,
			carbohydrates: 0,
			fat: 5,
			fiber: 0,
		};

		test("calculates density per 100g correctly", () => {
			const density = calculateNutrientDensity(sampleMacros, 200, "g");

			expect(density.calories).toBe(110); // 220 * (100/200)
			expect(density.protein).toBe(20.5); // 41 * (100/200)
			expect(density.carbohydrates).toBe(0);
			expect(density.fat).toBe(2.5); // 5 * (100/200)
			expect(density.fiber).toBe(0);
		});

		test("calculates density for different weight units", () => {
			// 7.05oz is approximately 200g
			const density = calculateNutrientDensity(sampleMacros, 7.05, "oz");

			expect(density.calories).toBeCloseTo(110, 0);
			expect(density.protein).toBeCloseTo(20.5, 1);
			expect(density.fat).toBeCloseTo(2.5, 1);
		});

		test("handles 100g weight (should return same values)", () => {
			const density = calculateNutrientDensity(sampleMacros, 100, "g");

			expect(density.calories).toBe(220);
			expect(density.protein).toBe(41);
			expect(density.carbohydrates).toBe(0);
			expect(density.fat).toBe(5);
			expect(density.fiber).toBe(0);
		});

		test("handles small weights (increases density)", () => {
			const density = calculateNutrientDensity(sampleMacros, 50, "g");

			expect(density.calories).toBe(440); // 220 * (100/50)
			expect(density.protein).toBe(82); // 41 * (100/50)
			expect(density.fat).toBe(10); // 5 * (100/50)
		});

		test("throws error for invalid weight", () => {
			expect(() => calculateNutrientDensity(sampleMacros, 0, "g")).toThrow(
				"Weight must be greater than 0",
			);
			expect(() => calculateNutrientDensity(sampleMacros, -10, "g")).toThrow(
				"Weight must be greater than 0",
			);
		});
	});

	describe("formatMacroValue", () => {
		test("formats values to 2 decimal places", () => {
			expect(formatMacroValue(Math.PI)).toBe(3.14);
			expect(formatMacroValue(100.999)).toBe(101);
			expect(formatMacroValue(0.001)).toBe(0);
			expect(formatMacroValue(123.456)).toBe(123.46);
		});

		test("handles whole numbers", () => {
			expect(formatMacroValue(100)).toBe(100);
			expect(formatMacroValue(0)).toBe(0);
		});

		test("handles negative numbers", () => {
			expect(formatMacroValue(-Math.PI)).toBe(-3.14);
		});
	});

	describe("formatMacroData", () => {
		test("formats all macro values", () => {
			const macros: MacroData = {
				calories: 220.123,
				protein: 41.789,
				carbohydrates: 0.001,
				fat: 5.999,
				fiber: 2.5555,
			};

			const formatted = formatMacroData(macros);

			expect(formatted.calories).toBe(220.12);
			expect(formatted.protein).toBe(41.79);
			expect(formatted.carbohydrates).toBe(0);
			expect(formatted.fat).toBe(6);
			expect(formatted.fiber).toBe(2.56);
		});

		test("handles zero values", () => {
			const macros: MacroData = {
				calories: 0,
				protein: 0,
				carbohydrates: 0,
				fat: 0,
				fiber: 0,
			};

			const formatted = formatMacroData(macros);

			expect(formatted.calories).toBe(0);
			expect(formatted.protein).toBe(0);
			expect(formatted.carbohydrates).toBe(0);
			expect(formatted.fat).toBe(0);
			expect(formatted.fiber).toBe(0);
		});
	});

	describe("Integration Tests", () => {
		test("complete calculation workflow", () => {
			const rawMacros: MacroData = {
				calories: 220,
				protein: 41,
				carbohydrates: 0,
				fat: 5,
				fiber: 0,
			};

			// Test complete workflow: raw chicken breast 200g -> cooked 150g
			const rawWeight = 200;
			const cookedWeight = 150;
			const weightUnit = "g" as const;

			// 1. Calculate cooking loss
			const cookingLoss = calculateCookingLoss(rawWeight, cookedWeight);
			expect(cookingLoss).toBe(25);

			// 2. Adjust macros for cooking
			const adjustedMacros = adjustMacrosForCooking(
				rawMacros,
				rawWeight,
				weightUnit,
				cookedWeight,
				weightUnit,
			);
			expect(adjustedMacros.calories).toBe(165);
			expect(adjustedMacros.protein).toBe(30.75);

			// 3. Calculate nutrient density for raw state
			const rawDensity = calculateNutrientDensity(
				rawMacros,
				rawWeight,
				weightUnit,
			);
			expect(rawDensity.calories).toBe(110); // per 100g
			expect(rawDensity.protein).toBe(20.5);

			// 4. Calculate nutrient density for cooked state
			const cookedDensity = calculateNutrientDensity(
				adjustedMacros,
				cookedWeight,
				weightUnit,
			);
			expect(cookedDensity.calories).toBe(110); // per 100g (same density)
			expect(cookedDensity.protein).toBe(20.5);

			// 5. Format results
			const formattedAdjusted = formatMacroData(adjustedMacros);
			const formattedRawDensity = formatMacroData(rawDensity);
			const formattedCookedDensity = formatMacroData(cookedDensity);

			expect(formattedAdjusted.calories).toBe(165);
			expect(formattedRawDensity.calories).toBe(110);
			expect(formattedCookedDensity.calories).toBe(110);
		});

		test("workflow with different units", () => {
			const rawMacros: MacroData = {
				calories: 220,
				protein: 41,
				carbohydrates: 0,
				fat: 5,
				fiber: 0,
			};

			// Raw: 7.05oz (≈200g), Cooked: 5.29oz (≈150g)
			const rawWeight = 7.05;
			const cookedWeight = 5.29;

			// Convert to grams for cooking loss calculation
			const rawWeightGrams = convertWeight(rawWeight, "oz", "g");
			const cookedWeightGrams = convertWeight(cookedWeight, "oz", "g");

			const cookingLoss = calculateCookingLoss(
				rawWeightGrams,
				cookedWeightGrams,
			);
			expect(cookingLoss).toBeCloseTo(25, 0);

			// Adjust macros with mixed units
			const adjustedMacros = adjustMacrosForCooking(
				rawMacros,
				rawWeight,
				"oz",
				cookedWeight,
				"oz",
			);
			expect(adjustedMacros.calories).toBeCloseTo(165, 0);
			expect(adjustedMacros.protein).toBeCloseTo(30.75, 1);
		});
	});
});
