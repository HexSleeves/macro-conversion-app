import { useState, useCallback, useMemo } from "react";
import type {
	FoodData,
	CalculationResults,
	SavedFood,
	ValidationErrors,
} from "@/lib/types";
import type { MacroCalculatorProps } from "@/lib/component-types";
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

	// Calculation results (will be implemented in later tasks)
	const calculationResults = useMemo<CalculationResults | null>(() => {
		// Placeholder - actual calculations will be implemented in task 6
		// This will contain the core calculation logic
		return null;
	}, [foodData]);

	// Validation state - determines if calculations can be performed
	const isCalculationValid = useMemo(() => {
		const hasNoValidationErrors = Object.values(validationErrors).every(
			(error) => error === null,
		);
		const hasRequiredData =
			foodData.name.trim() !== "" &&
			foodData.rawWeight > 0 &&
			foodData.cookedWeight > 0;

		return hasNoValidationErrors && hasRequiredData;
	}, [validationErrors, foodData]);

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
							rawData={foodData}
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
