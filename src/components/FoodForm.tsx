import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FoodFormProps } from "@/lib/component-types";
import type { FoodData, WeightUnit } from "@/lib/types";

import {
	validateCookingRatio,
	validateFoodData,
	validateMacroValue,
	validateWeight,
} from "@/lib/validations";

/**
 * Food input form component with real-time validation using React Hook Form
 * Handles user input for food details, weights, and macronutrients
 */
export default function FoodForm({
	foodData,
	onFoodDataChange,
	validationErrors,
}: FoodFormProps) {
	const form = useForm<FoodData>({
		defaultValues: foodData,
		mode: "onChange", // Enable real-time validation
	});

	// Sync form values with parent component changes
	useEffect(() => {
		form.reset(foodData);
	}, [foodData, form]);

	// Handle form value changes and propagate to parent
	const handleFormChange = (data: FoodData) => {
		onFoodDataChange(data);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Food Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<Form {...form}>
					<form className="space-y-6">
						{/* Food Name */}
						<FormField
							control={form.control}
							name="name"
							rules={{
								required: "Food name is required",
								validate: (value) => {
									const error = validateFoodData({
										...foodData,
										name: value,
									}).name;
									return error || true;
								},
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Food Name *</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter food name (e.g., Chicken Breast)"
											{...field}
											onChange={(e) => {
												field.onChange(e.target.value);
												handleFormChange({ ...foodData, name: e.target.value });
											}}
											className="text-base sm:text-sm h-11 sm:h-10"
										/>
									</FormControl>
									<FormMessage />
									{validationErrors.name && (
										<p className="text-sm text-red-600" role="alert">
											{validationErrors.name}
										</p>
									)}
								</FormItem>
							)}
						/>

						{/* Weight Inputs */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Raw Weight */}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="rawWeight"
									rules={{
										required: "Raw weight is required",
										validate: (value) => {
											const error = validateWeight(value, "rawWeight");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Raw Weight *</FormLabel>
											<div className="flex space-x-2">
												<FormControl>
													<Input
														type="number"
														placeholder="0"
														min="0"
														step="0.01"
														{...field}
														value={field.value || ""}
														onChange={(e) => {
															const value = parseFloat(e.target.value) || 0;
															field.onChange(value);
															handleFormChange({
																...foodData,
																rawWeight: value,
															});
														}}
														className="flex-1 text-base sm:text-sm h-11 sm:h-10"
													/>
												</FormControl>
												<FormField
													control={form.control}
													name="rawWeightUnit"
													render={({ field: unitField }) => (
														<Select
															value={unitField.value}
															onValueChange={(value: WeightUnit) => {
																unitField.onChange(value);
																handleFormChange({
																	...foodData,
																	rawWeightUnit: value,
																});
															}}
														>
															<SelectTrigger className="w-20 sm:w-24 h-11 sm:h-10">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="g">g</SelectItem>
																<SelectItem value="oz">oz</SelectItem>
																<SelectItem value="lb">lb</SelectItem>
																<SelectItem value="kg">kg</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
											<FormMessage />
											{validationErrors.rawWeight && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.rawWeight}
												</p>
											)}
										</FormItem>
									)}
								/>
							</div>

							{/* Cooked Weight */}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="cookedWeight"
									rules={{
										required: "Cooked weight is required",
										validate: (value) => {
											const weightError = validateWeight(value, "cookedWeight");
											if (weightError) return weightError;

											const rawWeight = form.getValues("rawWeight");
											if (rawWeight && value) {
												const ratioError = validateCookingRatio(
													rawWeight,
													value,
												);
												return ratioError || true;
											}
											return true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cooked Weight *</FormLabel>
											<div className="flex space-x-2">
												<FormControl>
													<Input
														type="number"
														placeholder="0"
														min="0"
														step="0.01"
														{...field}
														value={field.value || ""}
														onChange={(e) => {
															const value = parseFloat(e.target.value) || 0;
															field.onChange(value);
															handleFormChange({
																...foodData,
																cookedWeight: value,
															});
														}}
														className="flex-1 text-base sm:text-sm h-11 sm:h-10"
													/>
												</FormControl>
												<FormField
													control={form.control}
													name="cookedWeightUnit"
													render={({ field: unitField }) => (
														<Select
															value={unitField.value}
															onValueChange={(value: WeightUnit) => {
																unitField.onChange(value);
																handleFormChange({
																	...foodData,
																	cookedWeightUnit: value,
																});
															}}
														>
															<SelectTrigger className="w-20 sm:w-24 h-11 sm:h-10">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="g">g</SelectItem>
																<SelectItem value="oz">oz</SelectItem>
																<SelectItem value="lb">lb</SelectItem>
																<SelectItem value="kg">kg</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
											<FormMessage />
											{(validationErrors.cookedWeight ||
												validationErrors.cookingRatio) && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.cookedWeight ||
														validationErrors.cookingRatio}
												</p>
											)}
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Macronutrient Inputs */}
						<div className="space-y-4">
							<FormLabel className="text-sm font-medium">
								Macronutrients (per raw weight) *
							</FormLabel>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
								{/* Calories */}
								<FormField
									control={form.control}
									name="rawMacros.calories"
									rules={{
										validate: (value) => {
											const error = validateMacroValue(value, "calories");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs font-medium text-gray-600">
												Calories
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													min="0"
													step="0.1"
													{...field}
													value={field.value || ""}
													onChange={(e) => {
														const value = parseFloat(e.target.value) || 0;
														field.onChange(value);
														handleFormChange({
															...foodData,
															rawMacros: {
																...foodData.rawMacros,
																calories: value,
															},
														});
													}}
													className="w-full text-base sm:text-sm h-11 sm:h-10"
												/>
											</FormControl>
											<FormMessage />
											{validationErrors.calories && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.calories}
												</p>
											)}
										</FormItem>
									)}
								/>

								{/* Protein */}
								<FormField
									control={form.control}
									name="rawMacros.protein"
									rules={{
										validate: (value) => {
											const error = validateMacroValue(value, "protein");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs font-medium text-gray-600">
												Protein (g)
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													min="0"
													step="0.1"
													{...field}
													value={field.value || ""}
													onChange={(e) => {
														const value = parseFloat(e.target.value) || 0;
														field.onChange(value);
														handleFormChange({
															...foodData,
															rawMacros: {
																...foodData.rawMacros,
																protein: value,
															},
														});
													}}
													className="w-full text-base sm:text-sm h-11 sm:h-10"
												/>
											</FormControl>
											<FormMessage />
											{validationErrors.protein && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.protein}
												</p>
											)}
										</FormItem>
									)}
								/>

								{/* Carbohydrates */}
								<FormField
									control={form.control}
									name="rawMacros.carbohydrates"
									rules={{
										validate: (value) => {
											const error = validateMacroValue(value, "carbohydrates");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs font-medium text-gray-600">
												Carbs (g)
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													min="0"
													step="0.1"
													{...field}
													value={field.value || ""}
													onChange={(e) => {
														const value = parseFloat(e.target.value) || 0;
														field.onChange(value);
														handleFormChange({
															...foodData,
															rawMacros: {
																...foodData.rawMacros,
																carbohydrates: value,
															},
														});
													}}
													className="w-full text-base sm:text-sm h-11 sm:h-10"
												/>
											</FormControl>
											<FormMessage />
											{validationErrors.carbohydrates && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.carbohydrates}
												</p>
											)}
										</FormItem>
									)}
								/>

								{/* Fat */}
								<FormField
									control={form.control}
									name="rawMacros.fat"
									rules={{
										validate: (value) => {
											const error = validateMacroValue(value, "fat");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs font-medium text-gray-600">
												Fat (g)
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													min="0"
													step="0.1"
													{...field}
													value={field.value || ""}
													onChange={(e) => {
														const value = parseFloat(e.target.value) || 0;
														field.onChange(value);
														handleFormChange({
															...foodData,
															rawMacros: { ...foodData.rawMacros, fat: value },
														});
													}}
													className="w-full text-base sm:text-sm h-11 sm:h-10"
												/>
											</FormControl>
											<FormMessage />
											{validationErrors.fat && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.fat}
												</p>
											)}
										</FormItem>
									)}
								/>

								{/* Fiber */}
								<FormField
									control={form.control}
									name="rawMacros.fiber"
									rules={{
										validate: (value) => {
											const error = validateMacroValue(value, "fiber");
											return error || true;
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs font-medium text-gray-600">
												Fiber (g)
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													min="0"
													step="0.1"
													{...field}
													value={field.value || ""}
													onChange={(e) => {
														const value = parseFloat(e.target.value) || 0;
														field.onChange(value);
														handleFormChange({
															...foodData,
															rawMacros: {
																...foodData.rawMacros,
																fiber: value,
															},
														});
													}}
													className="w-full text-base sm:text-sm h-11 sm:h-10"
												/>
											</FormControl>
											<FormMessage />
											{validationErrors.fiber && (
												<p className="text-sm text-red-600" role="alert">
													{validationErrors.fiber}
												</p>
											)}
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Help Text */}
						<div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
							<p className="font-medium mb-1">Tips:</p>
							<ul className="space-y-1">
								<li>
									• Enter macronutrient values for the raw weight of your food
								</li>
								<li>
									• Cooked weight should be less than or equal to raw weight
								</li>
								<li>• Use consistent units for accurate calculations</li>
							</ul>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
