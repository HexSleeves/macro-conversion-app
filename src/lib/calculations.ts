/**
 * Core calculation functions for the Macro Cooking Calculator
 */

import type { MacroData, WeightUnit } from "./types";
import { convertWeight } from "./weightUtils";

// Re-export weight conversion functions for convenience
export { convertWeight, getAllWeightConversions } from "./weightUtils";

/**
 * Calculate cooking loss percentage
 * Formula: ((Raw Weight - Cooked Weight) / Raw Weight) * 100
 */
export function calculateCookingLoss(
	rawWeight: number,
	cookedWeight: number,
): number {
	if (rawWeight <= 0) {
		throw new Error("Raw weight must be greater than 0");
	}
	if (cookedWeight < 0) {
		throw new Error("Cooked weight cannot be negative");
	}
	if (cookedWeight > rawWeight) {
		throw new Error("Cooked weight cannot be greater than raw weight");
	}

	return ((rawWeight - cookedWeight) / rawWeight) * 100;
}

/**
 * Adjust macronutrient values for cooking
 * Formula: (Raw Nutrient Value / Raw Weight in grams) * Cooked Weight in grams
 */
export function adjustMacrosForCooking(
	rawMacros: MacroData,
	rawWeight: number,
	rawWeightUnit: WeightUnit,
	cookedWeight: number,
	cookedWeightUnit: WeightUnit,
): MacroData {
	// Convert weights to grams for calculation
	const rawWeightInGrams = convertWeight(rawWeight, rawWeightUnit, "g");
	const cookedWeightInGrams = convertWeight(
		cookedWeight,
		cookedWeightUnit,
		"g",
	);

	if (rawWeightInGrams <= 0) {
		throw new Error("Raw weight must be greater than 0");
	}
	if (cookedWeightInGrams < 0) {
		throw new Error("Cooked weight cannot be negative");
	}

	// Calculate the adjustment ratio
	const adjustmentRatio = cookedWeightInGrams / rawWeightInGrams;

	return {
		calories: rawMacros.calories * adjustmentRatio,
		protein: rawMacros.protein * adjustmentRatio,
		carbohydrates: rawMacros.carbohydrates * adjustmentRatio,
		fat: rawMacros.fat * adjustmentRatio,
		fiber: rawMacros.fiber * adjustmentRatio,
	};
}

/**
 * Calculate nutrient density per 100g
 */
export function calculateNutrientDensity(
	macros: MacroData,
	weight: number,
	weightUnit: WeightUnit,
): MacroData {
	const weightInGrams = convertWeight(weight, weightUnit, "g");

	if (weightInGrams <= 0) {
		throw new Error("Weight must be greater than 0");
	}

	// Calculate density per 100g
	const densityRatio = 100 / weightInGrams;

	return {
		calories: macros.calories * densityRatio,
		protein: macros.protein * densityRatio,
		carbohydrates: macros.carbohydrates * densityRatio,
		fat: macros.fat * densityRatio,
		fiber: macros.fiber * densityRatio,
	};
}

/**
 * Format macro values with appropriate precision (2 decimal places)
 */
export function formatMacroValue(value: number): number {
	return Math.round(value * 100) / 100;
}

/**
 * Format all macro values in a MacroData object
 */
export function formatMacroData(macros: MacroData): MacroData {
	return {
		calories: formatMacroValue(macros.calories),
		protein: formatMacroValue(macros.protein),
		carbohydrates: formatMacroValue(macros.carbohydrates),
		fat: formatMacroValue(macros.fat),
		fiber: formatMacroValue(macros.fiber),
	};
}
