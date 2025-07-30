import type { MacroDisplayProps } from "@/lib/component-types";

/**
 * Macro calculation results display component
 * Shows cooking loss, adjusted macros, and weight conversions
 * Updates in real-time as user types
 */
export default function MacroDisplay({
	calculationResults,
	isCalculationValid,
}: MacroDisplayProps) {
	if (!isCalculationValid || !calculationResults) {
		return (
			<div className="text-center py-8 text-gray-500">
				<p>Enter food details to see calculation results</p>
			</div>
		);
	}

	const {
		cookingLossPercentage,
		adjustedMacros,
		rawDensityPer100g,
		cookedDensityPer100g,
		weightConversions,
	} = calculationResults;

	return (
		<div className="space-y-6">
			{/* Cooking Loss Display */}
			<div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
				<h3 className="font-medium text-gray-900 mb-2">Cooking Loss</h3>
				<div className="text-2xl font-bold text-blue-600">
					{cookingLossPercentage.toFixed(2)}%
				</div>
				<p className="text-sm text-gray-600 mt-1">Weight lost during cooking</p>
			</div>

			{/* Adjusted Macros Display */}
			<div className="space-y-4">
				<h3 className="font-medium text-gray-900">
					Adjusted Macronutrients (Cooked Portion)
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					<div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
						<div className="text-sm text-gray-600">Calories</div>
						<div className="text-lg font-semibold text-red-700">
							{adjustedMacros.calories.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">kcal</div>
					</div>
					<div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
						<div className="text-sm text-gray-600">Protein</div>
						<div className="text-lg font-semibold text-green-700">
							{adjustedMacros.protein.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">g</div>
					</div>
					<div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
						<div className="text-sm text-gray-600">Carbs</div>
						<div className="text-lg font-semibold text-yellow-700">
							{adjustedMacros.carbohydrates.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">g</div>
					</div>
					<div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
						<div className="text-sm text-gray-600">Fat</div>
						<div className="text-lg font-semibold text-purple-700">
							{adjustedMacros.fat.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">g</div>
					</div>
					<div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
						<div className="text-sm text-gray-600">Fiber</div>
						<div className="text-lg font-semibold text-orange-700">
							{adjustedMacros.fiber.toFixed(1)}
						</div>
						<div className="text-xs text-gray-500">g</div>
					</div>
				</div>
			</div>

			{/* Nutrient Density Comparison */}
			<div className="space-y-4">
				<h3 className="font-medium text-gray-900">
					Nutrient Density (per 100g)
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Raw Density */}
					<div className="bg-gray-50 rounded-lg p-4 border">
						<h4 className="font-medium text-gray-800 mb-3">Raw</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span>Calories:</span>
								<span className="font-medium">
									{rawDensityPer100g.calories.toFixed(1)} kcal
								</span>
							</div>
							<div className="flex justify-between">
								<span>Protein:</span>
								<span className="font-medium">
									{rawDensityPer100g.protein.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Carbs:</span>
								<span className="font-medium">
									{rawDensityPer100g.carbohydrates.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Fat:</span>
								<span className="font-medium">
									{rawDensityPer100g.fat.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Fiber:</span>
								<span className="font-medium">
									{rawDensityPer100g.fiber.toFixed(1)}g
								</span>
							</div>
						</div>
					</div>

					{/* Cooked Density */}
					<div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
						<h4 className="font-medium text-gray-800 mb-3">Cooked</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span>Calories:</span>
								<span className="font-medium">
									{cookedDensityPer100g.calories.toFixed(1)} kcal
								</span>
							</div>
							<div className="flex justify-between">
								<span>Protein:</span>
								<span className="font-medium">
									{cookedDensityPer100g.protein.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Carbs:</span>
								<span className="font-medium">
									{cookedDensityPer100g.carbohydrates.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Fat:</span>
								<span className="font-medium">
									{cookedDensityPer100g.fat.toFixed(1)}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Fiber:</span>
								<span className="font-medium">
									{cookedDensityPer100g.fiber.toFixed(1)}g
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Weight Conversions Display */}
			<div className="space-y-4">
				<h3 className="font-medium text-gray-900">Weight Conversions</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Raw Weight Conversions */}
					<div className="bg-gray-50 rounded-lg p-4 border">
						<h4 className="font-medium text-gray-800 mb-3">Raw Weight</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div className="flex justify-between">
								<span>Grams:</span>
								<span className="font-medium">
									{weightConversions.raw.grams}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Ounces:</span>
								<span className="font-medium">
									{weightConversions.raw.ounces}oz
								</span>
							</div>
							<div className="flex justify-between">
								<span>Pounds:</span>
								<span className="font-medium">
									{weightConversions.raw.pounds}lb
								</span>
							</div>
							<div className="flex justify-between">
								<span>Kilograms:</span>
								<span className="font-medium">
									{weightConversions.raw.kilograms}kg
								</span>
							</div>
						</div>
					</div>

					{/* Cooked Weight Conversions */}
					<div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
						<h4 className="font-medium text-gray-800 mb-3">Cooked Weight</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div className="flex justify-between">
								<span>Grams:</span>
								<span className="font-medium">
									{weightConversions.cooked.grams}g
								</span>
							</div>
							<div className="flex justify-between">
								<span>Ounces:</span>
								<span className="font-medium">
									{weightConversions.cooked.ounces}oz
								</span>
							</div>
							<div className="flex justify-between">
								<span>Pounds:</span>
								<span className="font-medium">
									{weightConversions.cooked.pounds}lb
								</span>
							</div>
							<div className="flex justify-between">
								<span>Kilograms:</span>
								<span className="font-medium">
									{weightConversions.cooked.kilograms}kg
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
