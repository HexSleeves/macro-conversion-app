import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MacroCalculator from "../MacroCalculator";

describe("MacroCalculator Component", () => {
	it("renders the main calculator structure", () => {
		render(<MacroCalculator />);

		// Check that main sections are rendered
		expect(screen.getByText("Food Details")).toBeInTheDocument();
		expect(screen.getByText("Calculation Results")).toBeInTheDocument();
		expect(screen.getByText("Saved Foods")).toBeInTheDocument();
	});

	it("renders placeholder content for future tasks", () => {
		render(<MacroCalculator />);

		// Check that placeholder content is shown
		expect(
			screen.getByText("Enter food details to see calculation results"),
		).toBeInTheDocument();
		expect(
			screen.getByText("Saved foods management will be implemented in task 7"),
		).toBeInTheDocument();
	});

	it("renders form inputs in enabled state", () => {
		render(<MacroCalculator />);

		// Check that form inputs exist and are enabled
		const foodNameInput = screen.getByPlaceholderText(
			"Enter food name (e.g., Chicken Breast)",
		);
		const rawWeightInputs = screen.getAllByPlaceholderText("0");

		expect(foodNameInput).toBeEnabled();
		expect(rawWeightInputs[0]).toBeEnabled(); // Raw weight input
		expect(rawWeightInputs[1]).toBeEnabled(); // Cooked weight input
	});

	it("renders save button in disabled state", () => {
		render(<MacroCalculator />);

		const saveButton = screen.getByText("Save Current Food");
		expect(saveButton).toBeDisabled();
	});
});
