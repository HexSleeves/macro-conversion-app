/**
 * Weight conversion constants for the Macro Cooking Calculator
 */

export const WEIGHT_CONVERSIONS = {
	GRAMS_TO_OUNCES: 0.035274,
	OUNCES_TO_GRAMS: 28.3495,
	GRAMS_TO_POUNDS: 0.00220462,
	POUNDS_TO_GRAMS: 453.592,
	GRAMS_TO_KILOGRAMS: 0.001,
	KILOGRAMS_TO_GRAMS: 1000,
} as const;

/**
 * Error messages for validation
 */
export const ERROR_MESSAGES = {
	REQUIRED_FIELD: "This field is required",
	POSITIVE_NUMBER_ONLY: "Please enter a positive number",
	COOKED_EXCEEDS_RAW: "Cooked weight cannot be greater than raw weight",
	INVALID_NUMBER: "Please enter a valid number",
	STORAGE_ERROR: "Unable to save data. Please try again.",
} as const;

/**
 * Weight unit display labels
 */
export const WEIGHT_UNIT_LABELS = {
	g: "grams",
	oz: "ounces",
	lb: "pounds",
	kg: "kilograms",
} as const;
/**
 * Storage keys for localStorage
 */
export const STORAGE_KEYS = {
	SAVED_FOODS: "macro-calculator-saved-foods",
} as const;
