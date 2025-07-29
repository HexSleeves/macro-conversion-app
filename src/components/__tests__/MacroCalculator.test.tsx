import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
			screen.getByText("Food form inputs will be implemented in task 5"),
		).toBeInTheDocument();
		expect(
			screen.getByText("Enter food details to see calculation results"),
		).toBeInTheDocument();
		expect(
			screen.getByText("Saved foods management will be implemented in task 7"),
		).toBeInTheDocument();
	});

	it("renders form inputs in disabled state", () => {
		render(<MacroCalculator />);

		// Check that form inputs exist but are disabled
		const foodNameInput = screen.getByPlaceholderText("Enter food name");
		const rawWeightInput = screen.getByPlaceholderText("0");
		const unitSelect = screen.getByDisplayValue("g");

		expect(foodNameInput).toBeDisabled();
		expect(rawWeightInput).toBeDisabled();
		expect(unitSelect).toBeDisabled();
	});

	it("renders save button in disabled state", () => {
		render(<MacroCalculator />);

		const saveButton = screen.getByText("Save Current Food");
		expect(saveButton).toBeDisabled();
	});
});
