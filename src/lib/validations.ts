/**
 * Input validation system for the Macro Cooking Calculator
 */

import { ERROR_MESSAGES } from "./constants";
import type {
	FoodData,
	MacroData,
	ValidationErrors,
	WeightUnit,
} from "./types";

/**
 * Validates if a value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value) && value > 0;
}

/**
 * Validates if a value is a valid number (including zero)
 */
export function isValidNumber(value: unknown): value is number {
	return (
		typeof value === "number" && !Number.isNaN(value) && Number.isFinite(value)
	);
}

/**
 * Validates if a string is not empty after trimming
 */
export function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validates a weight value
 */
export function validateWeight(
	weight: number,
	_fieldName: string,
): string | null {
	if (!isValidNumber(weight)) {
		return ERROR_MESSAGES.INVALID_NUMBER;
	}

	if (!isPositiveNumber(weight)) {
		return ERROR_MESSAGES.POSITIVE_NUMBER_ONLY;
	}

	return null;
}

/**
 * Validates a macronutrient value
 */
export function validateMacroValue(
	value: number,
	_fieldName: string,
): string | null {
	if (!isValidNumber(value)) {
		return ERROR_MESSAGES.INVALID_NUMBER;
	}

	if (value < 0) {
		return ERROR_MESSAGES.POSITIVE_NUMBER_ONLY;
	}

	return null;
}

/**
 * Validates the cooking ratio (cooked weight should not exceed raw weight)
 */
export function validateCookingRatio(
	rawWeight: number,
	cookedWeight: number,
): string | null {
	// First validate individual weights
	const rawWeightError = validateWeight(rawWeight, "rawWeight");
	if (rawWeightError) return rawWeightError;

	const cookedWeightError = validateWeight(cookedWeight, "cookedWeight");
	if (cookedWeightError) return cookedWeightError;

	// Check if cooked weight exceeds raw weight
	if (cookedWeight > rawWeight) {
		return ERROR_MESSAGES.COOKED_EXCEEDS_RAW;
	}

	return null;
}

/**
 * Validates a food name
 */
export function validateFoodName(name: string): string | null {
	if (!isNonEmptyString(name)) {
		return ERROR_MESSAGES.REQUIRED_FIELD;
	}

	return null;
}

/**
 * Validates all macro data fields
 */
export function validateMacroData(
	macros: MacroData,
): Partial<ValidationErrors> {
	const errors: Partial<ValidationErrors> = {};

	const caloriesError = validateMacroValue(macros.calories, "calories");
	if (caloriesError) errors.calories = caloriesError;

	const proteinError = validateMacroValue(macros.protein, "protein");
	if (proteinError) errors.protein = proteinError;

	const carbohydratesError = validateMacroValue(
		macros.carbohydrates,
		"carbohydrates",
	);
	if (carbohydratesError) errors.carbohydrates = carbohydratesError;

	const fatError = validateMacroValue(macros.fat, "fat");
	if (fatError) errors.fat = fatError;

	const fiberError = validateMacroValue(macros.fiber, "fiber");
	if (fiberError) errors.fiber = fiberError;

	return errors;
}

/**
 * Validates complete food data
 */
export function validateFoodData(data: FoodData): ValidationErrors {
	const errors: ValidationErrors = {};

	// Validate food name
	const nameError = validateFoodName(data.name);
	if (nameError) errors.name = nameError;

	// Validate raw weight
	const rawWeightError = validateWeight(data.rawWeight, "rawWeight");
	if (rawWeightError) errors.rawWeight = rawWeightError;

	// Validate cooked weight
	const cookedWeightError = validateWeight(data.cookedWeight, "cookedWeight");
	if (cookedWeightError) errors.cookedWeight = cookedWeightError;

	// Validate cooking ratio if both weights are valid
	if (!rawWeightError && !cookedWeightError) {
		const cookingRatioError = validateCookingRatio(
			data.rawWeight,
			data.cookedWeight,
		);
		if (cookingRatioError) errors.cookingRatio = cookingRatioError;
	}

	// Validate macro data
	const macroErrors = validateMacroData(data.rawMacros);
	Object.assign(errors, macroErrors);

	return errors;
}

/**
 * Sanitizes string input by trimming whitespace
 */
export function sanitizeStringInput(input: string): string {
	return input.trim();
}

/**
 * Sanitizes numeric input by parsing and validating
 */
export function sanitizeNumericInput(input: string | number): number {
	if (typeof input === "number") {
		return input;
	}

	const parsed = parseFloat(input);
	return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Checks if there are any validation errors
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
	return Object.values(errors).some((error) => error !== null);
}

/**
 * Gets the first validation error message
 */
export function getFirstValidationError(
	errors: ValidationErrors,
): string | null {
	const firstError = Object.values(errors).find((error) => error !== null);
	return firstError || null;
}

/**
 * Validates a weight unit
 */
export function validateWeightUnit(unit: string): unit is WeightUnit {
	return ["g", "oz", "lb", "kg"].includes(unit);
}
