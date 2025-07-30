import { useCallback, useMemo, useState } from "react";
import {
	adjustMacrosForCooking,
	calculateCookingLoss,
	calculateNutrientDensity,
	formatMacroData,
	getAllWeightConversions,
} from "@/lib/calculations";
import type { MacroCalculatorProps } from "@/lib/component-types";
import type {
	CalculationResults,
	FoodData,
	SavedFood,
	ValidationErrors,
} from "@/lib/types";
import { formatWeight } from "@/lib/weightUtils";
import FoodForm from "./FoodForm";
import MacroDisplay from "./MacroDisplay";
import SavedFoods from "./SavedFoods";

// Initial state for food data
const initialFoodData: FoodData = {
	name: "",
	rawWeight: 0,
	rawWeightUnit: "g",
	cookedWeight: 0,
	cookedWeightUnit: "g",
	rawMacros: {
		calories: 0,
		protein: 0,
		carbohydrates: 0,
		fat: 0,
		fiber: 0,
	},
};

/**
 * Main container component for the macro calculator
 * Manages state and coordinates between child components
 * Implements the core application logic and state management
 */
export default function MacroCalculator({ className }: MacroCalculatorProps) {
	// Core state management
	const [foodData, setFoodData] = useState<FoodData>(initialFoodData);
	const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
		{},
	);

	// Validation state - determines if calculations can be performed
	const isCalculationValid = useMemo(() => {
		const hasNoValidationErrors = Object.values(validationErrors).every(
			(error) => error === null,
		);
		const hasRequiredData =
			foodData.name.trim() !== "" &&
			foodData.rawWeight > 0 &&
			foodData.cookedWeight > 0 &&
			foodData.cookedWeight <= foodData.rawWeight;

		// Check if at least one macro value is provided
		const hasMacroData = Object.values(foodData.rawMacros).some(
			(value) => value > 0,
		);

		return hasNoValidationErrors && hasRequiredData && hasMacroData;
	}, [validationErrors, foodData]);

	// Real-time calculation results
	const calculationResults = useMemo<CalculationResults | null>(() => {
		// Only calculate if we have valid data
		if (!isCalculationValid) {
			return null;
		}

		try {
			// Calculate cooking loss percentage
			const rawWeightInGrams = foodData.rawWeight;
			const cookedWeightInGrams = foodData.cookedWeight;
			const cookingLossPercentage = calculateCookingLoss(
				rawWeightInGrams,
				cookedWeightInGrams,
			);

			// Calculate adjusted macros for the cooked portion
			const adjustedMacros = formatMacroData(
				adjustMacrosForCooking(
					foodData.rawMacros,
					foodData.rawWeight,
					foodData.rawWeightUnit,
					foodData.cookedWeight,
					foodData.cookedWeightUnit,
				),
			);

			// Calculate nutrient density per 100g for both raw and cooked
			const rawDensityPer100g = formatMacroData(
				calculateNutrientDensity(
					foodData.rawMacros,
					foodData.rawWeight,
					foodData.rawWeightUnit,
				),
			);

			const cookedDensityPer100g = formatMacroData(
				calculateNutrientDensity(
					adjustedMacros,
					foodData.cookedWeight,
					foodData.cookedWeightUnit,
				),
			);

			// Get weight conversions for both raw and cooked weights
			const rawConversions = getAllWeightConversions(
				foodData.rawWeight,
				foodData.rawWeightUnit,
			);
			const cookedConversions = getAllWeightConversions(
				foodData.cookedWeight,
				foodData.cookedWeightUnit,
			);

			// Format weight conversions
			const weightConversions = {
				raw: {
					grams: formatWeight(rawConversions.grams),
					ounces: formatWeight(rawConversions.ounces),
					pounds: formatWeight(rawConversions.pounds),
					kilograms: formatWeight(rawConversions.kilograms),
				},
				cooked: {
					grams: formatWeight(cookedConversions.grams),
					ounces: formatWeight(cookedConversions.ounces),
					pounds: formatWeight(cookedConversions.pounds),
					kilograms: formatWeight(cookedConversions.kilograms),
				},
			};

			return {
				cookingLossPercentage: Math.round(cookingLossPercentage * 100) / 100,
				adjustedMacros,
				rawDensityPer100g,
				cookedDensityPer100g,
				weightConversions,
			};
		} catch (error) {
			console.error("Calculation error:", error);
			return null;
		}
	}, [foodData, isCalculationValid]);

	// Event handlers with proper error handling and state updates
	const handleFoodDataChange = useCallback((newData: FoodData) => {
		setFoodData(newData);
		// Clear validation errors when data changes to allow real-time validation
		setValidationErrors({});
	}, []);

	const handleSaveFood = useCallback((food: SavedFood) => {
		setSavedFoods((prev) => {
			// Prevent duplicate saves by checking if food already exists
			const exists = prev.some((existing) => existing.name === food.name);
			if (exists) {
				return prev;
			}
			return [...prev, food];
		});
	}, []);

	const handleLoadFood = useCallback((food: SavedFood) => {
		// Load saved food data - will be implemented in task 7
		// This will populate the form with saved cooking ratios
		console.log("Loading food:", food);
	}, []);

	const handleDeleteFood = useCallback((id: string) => {
		setSavedFoods((prev) => prev.filter((food) => food.id !== id));
	}, []);

	return (
		<div className={className}>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<div className="space-y-8">
					{/* Food Input Form - will be implemented in task 5 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4">Food Details</h2>
						<FoodForm
							foodData={foodData}
							onFoodDataChange={handleFoodDataChange}
							validationErrors={validationErrors}
						/>
					</div>

					{/* Calculation Results Display - will be implemented in task 6 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
						<MacroDisplay
							calculationResults={calculationResults}
							isCalculationValid={isCalculationValid}
						/>
					</div>

					{/* Saved Foods Management - will be implemented in task 7 */}
					<div className="bg-white rounded-lg shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4">Saved Foods</h2>
						<SavedFoods
							savedFoods={savedFoods}
							onSaveFood={handleSaveFood}
							onLoadFood={handleLoadFood}
							onDeleteFood={handleDeleteFood}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
