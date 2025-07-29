/**
 * Core data types for the Macro Cooking Calculator
 */

export type WeightUnit = "g" | "oz" | "lb" | "kg";

export interface MacroData {
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
	fiber: number;
}

export interface FoodData {
	name: string;
	rawWeight: number;
	rawWeightUnit: WeightUnit;
	cookedWeight: number;
	cookedWeightUnit: WeightUnit;
	rawMacros: MacroData;
}

export interface WeightConversions {
	grams: number;
	ounces: number;
	pounds: number;
	kilograms: number;
}

export interface CalculationResults {
	cookingLossPercentage: number;
	adjustedMacros: MacroData;
	rawDensityPer100g: MacroData;
	cookedDensityPer100g: MacroData;
	weightConversions: {
		raw: WeightConversions;
		cooked: WeightConversions;
	};
}

export interface SavedFood {
	id: string;
	name: string;
	cookingRatio: number; // cookedWeight / rawWeight
	dateAdded: number;
}

export interface ValidationErrors {
	[fieldName: string]: string | null;
}
// Legacy type alias for compatibility with existing store
export type MacroResult = CalculationResults;
