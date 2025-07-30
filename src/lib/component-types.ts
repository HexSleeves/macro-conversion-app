/**
 * Component prop interface definitions for the Macro Calculator
 */

import type {
	CalculationResults,
	FoodData,
	SavedFood,
	ValidationErrors,
} from "./types";

export interface MacroCalculatorProps {
	className?: string;
}

export interface FoodFormProps {
	foodData: FoodData;
	onFoodDataChange: (data: FoodData) => void;
	validationErrors: ValidationErrors;
}

export interface MacroDisplayProps {
	calculationResults: CalculationResults | null;
	isCalculationValid: boolean;
}

export interface SavedFoodsProps {
	savedFoods: SavedFood[];
	onSaveFood: (food: SavedFood) => void;
	onLoadFood: (food: SavedFood) => void;
	onDeleteFood: (id: string) => void;
}
