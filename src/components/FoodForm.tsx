import type { FoodFormProps } from "@/lib/component-types";

/**
 * Food input form component
 * Handles user input for food details, weights, and macronutrients
 * Will be fully implemented in task 5
 */
export default function FoodForm({
	foodData,
	onFoodDataChange,
	validationErrors,
}: FoodFormProps) {
	// Props will be used when form is fully implemented in task 5
	console.log("FoodForm props:", {
		foodData,
		onFoodDataChange,
		validationErrors,
	});

	return (
		<div className="space-y-4">
			<div className="text-sm text-gray-600">
				Food form inputs will be implemented in task 5
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label
						htmlFor="food-name-input"
						className="block text-sm font-medium text-gray-700"
					>
						Food Name
					</label>
					<input
						id="food-name-input"
						type="text"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter food name"
						disabled
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="raw-weight-input"
						className="block text-sm font-medium text-gray-700"
					>
						Raw Weight
					</label>
					<div className="flex space-x-2">
						<input
							id="raw-weight-input"
							type="number"
							className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="0"
							disabled
						/>
						<select
							aria-label="Raw weight unit"
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							disabled
						>
							<option value="g">g</option>
							<option value="oz">oz</option>
							<option value="lb">lb</option>
							<option value="kg">kg</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}
