import type { MacroDisplayProps } from "@/lib/component-types";

/**
 * Macro calculation results display component
 * Shows cooking loss, adjusted macros, and weight conversions
 * Will be fully implemented in task 6
 */
export default function MacroDisplay({
	rawData,
	calculationResults,
	isCalculationValid,
}: MacroDisplayProps) {
	// Props will be used when display is fully implemented in task 6
	console.log("MacroDisplay props:", {
		rawData,
		calculationResults,
		isCalculationValid,
	});

	if (!isCalculationValid || !calculationResults) {
		return (
			<div className="text-center py-8 text-gray-500">
				<p>Enter food details to see calculation results</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="text-sm text-gray-600">
				Calculation results display will be implemented in task 6
			</div>

			{/* Cooking Loss Display */}
			<div className="bg-gray-50 rounded-lg p-4">
				<h3 className="font-medium text-gray-900 mb-2">Cooking Loss</h3>
				<div className="text-2xl font-bold text-blue-600">--.--%</div>
			</div>

			{/* Adjusted Macros Display */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				{["Calories", "Protein", "Carbs", "Fat", "Fiber"].map((macro) => (
					<div key={macro} className="bg-gray-50 rounded-lg p-3 text-center">
						<div className="text-sm text-gray-600">{macro}</div>
						<div className="text-lg font-semibold">--.-</div>
					</div>
				))}
			</div>

			{/* Weight Conversions Display */}
			<div className="bg-gray-50 rounded-lg p-4">
				<h3 className="font-medium text-gray-900 mb-2">Weight Conversions</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
					<div>Grams: --.-g</div>
					<div>Ounces: --.-oz</div>
					<div>Pounds: --.-lb</div>
					<div>Kilograms: --.-kg</div>
				</div>
			</div>
		</div>
	);
}
