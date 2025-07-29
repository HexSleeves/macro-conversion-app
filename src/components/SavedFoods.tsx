import type { SavedFoodsProps } from "@/lib/component-types";

/**
 * Saved foods management component
 * Handles saving, loading, and deleting food items with cooking ratios
 * Will be fully implemented in task 7
 */
export default function SavedFoods({
	savedFoods,
	onSaveFood,
	onLoadFood,
	onDeleteFood,
}: SavedFoodsProps) {
	// Props will be used when saved foods is fully implemented in task 7
	console.log("SavedFoods props:", {
		savedFoods,
		onSaveFood,
		onLoadFood,
		onDeleteFood,
	});

	return (
		<div className="space-y-4">
			<div className="text-sm text-gray-600">
				Saved foods management will be implemented in task 7
			</div>

			{/* Save Current Food Button */}
			<div className="flex justify-end items-center">
				<button
					type="button"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
					disabled
				>
					Save Current Food
				</button>
			</div>

			{/* Saved Foods List */}
			<div className="space-y-2">
				{savedFoods.length === 0 ? (
					<div className="text-center py-4 text-gray-500">
						No saved foods yet
					</div>
				) : (
					<div className="text-gray-500">
						Saved foods list will be displayed here
					</div>
				)}
			</div>

			{/* Load Food Dropdown */}
			<div className="space-y-2">
				<label
					htmlFor="saved-food-select"
					className="block text-sm font-medium text-gray-700"
				>
					Load Saved Food
				</label>
				<select
					id="saved-food-select"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					disabled
				>
					<option value="">Select a saved food...</option>
				</select>
			</div>
		</div>
	);
}
