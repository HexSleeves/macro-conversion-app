/**
 * Weight conversion utility functions
 */

import { WEIGHT_CONVERSIONS } from "./constants";
import type { WeightConversions, WeightUnit } from "./types";

/**
 * Convert weight from one unit to another
 */
export function convertWeight(
	value: number,
	fromUnit: WeightUnit,
	toUnit: WeightUnit,
): number {
	if (fromUnit === toUnit) {
		return value;
	}

	// First convert to grams as base unit
	let grams: number;

	switch (fromUnit) {
		case "g":
			grams = value;
			break;
		case "oz":
			grams = value * WEIGHT_CONVERSIONS.OUNCES_TO_GRAMS;
			break;
		case "lb":
			grams = value * WEIGHT_CONVERSIONS.POUNDS_TO_GRAMS;
			break;
		case "kg":
			grams = value * WEIGHT_CONVERSIONS.KILOGRAMS_TO_GRAMS;
			break;
		default:
			throw new Error(`Unsupported weight unit: ${fromUnit}`);
	}

	// Then convert from grams to target unit
	switch (toUnit) {
		case "g":
			return grams;
		case "oz":
			return grams * WEIGHT_CONVERSIONS.GRAMS_TO_OUNCES;
		case "lb":
			return grams * WEIGHT_CONVERSIONS.GRAMS_TO_POUNDS;
		case "kg":
			return grams * WEIGHT_CONVERSIONS.GRAMS_TO_KILOGRAMS;
		default:
			throw new Error(`Unsupported weight unit: ${toUnit}`);
	}
}

/**
 * Get all weight conversions for a given weight and unit
 */
export function getAllWeightConversions(
	weight: number,
	unit: WeightUnit,
): WeightConversions {
	return {
		grams: convertWeight(weight, unit, "g"),
		ounces: convertWeight(weight, unit, "oz"),
		pounds: convertWeight(weight, unit, "lb"),
		kilograms: convertWeight(weight, unit, "kg"),
	};
}

/**
 * Format weight value with appropriate precision
 */
export function formatWeight(weight: number): number {
	return Math.round(weight * 100) / 100;
}
