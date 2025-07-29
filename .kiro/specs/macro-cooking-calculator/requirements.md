# Requirements Document

## Introduction

The Precision Macro & Cooking Loss Calculator is a web application designed to help users accurately track their dietary intake by adjusting macronutrient values when food weight changes from raw to cooked state. The application provides universal weight conversion capabilities and scientifically-grounded macro adjustments based on nutrient density principles.

## Requirements

### Requirement 1

**User Story:** As a nutrition-conscious individual, I want to input food details and weights in various units, so that I can track my macronutrients accurately regardless of my preferred measurement system.

#### Acceptance Criteria

1. WHEN a user enters a food item name THEN the system SHALL accept and store the text input
2. WHEN a user enters raw weight THEN the system SHALL accept positive numerical values only
3. WHEN a user selects a weight unit THEN the system SHALL provide options for grams, ounces, pounds, and kilograms
4. WHEN a user enters cooked weight THEN the system SHALL accept positive numerical values only and validate that cooked weight does not exceed raw weight
5. WHEN a user enters macronutrient values THEN the system SHALL accept positive numerical inputs for calories, protein, carbohydrates, fat, and fiber

### Requirement 2

**User Story:** As a user tracking my food intake, I want real-time weight conversions displayed, so that I can see equivalent weights in all units without manual calculation.

#### Acceptance Criteria

1. WHEN a user enters a weight value THEN the system SHALL automatically display equivalent weights in all supported units (g, oz, lb, kg)
2. WHEN weight values change THEN the system SHALL update all unit conversions in real-time
3. WHEN displaying converted weights THEN the system SHALL show values with appropriate precision (2 decimal places)

### Requirement 3

**User Story:** As someone who cooks their food, I want to see how cooking affects my macronutrient density, so that I can accurately log my actual food consumption.

#### Acceptance Criteria

1. WHEN raw and cooked weights are entered THEN the system SHALL calculate cooking loss percentage as ((Raw Weight - Cooked Weight) / Raw Weight) \* 100
2. WHEN macronutrient values are provided THEN the system SHALL recalculate adjusted values using the formula: (Raw Nutrient Value / Raw Weight in grams) \* Cooked Weight in grams
3. WHEN calculations are performed THEN the system SHALL display results with 2 decimal place precision
4. WHEN displaying results THEN the system SHALL show both total adjusted macros and per-100g density for raw and cooked states

### Requirement 4

**User Story:** As a frequent user of the calculator, I want to save food items with their cooking ratios, so that I can quickly perform calculations without re-measuring cooked portions.

#### Acceptance Criteria

1. WHEN a calculation is completed THEN the system SHALL enable a "Save Food" button
2. WHEN a user saves a food item THEN the system SHALL store the food name and raw-to-cooked weight ratio
3. WHEN a user accesses saved foods THEN the system SHALL display a dropdown menu with all saved food names
4. WHEN a user selects a saved food THEN the system SHALL auto-populate the cooking ratio and allow entry of new raw weight and macros

### Requirement 5

**User Story:** As a user entering data, I want clear validation and error messages, so that I can correct mistakes and ensure accurate calculations.

#### Acceptance Criteria

1. WHEN invalid data is entered THEN the system SHALL display clear, non-intrusive error messages
2. WHEN cooked weight exceeds raw weight THEN the system SHALL show error message "Cooked weight cannot be greater than raw weight"
3. WHEN negative values are entered THEN the system SHALL reject the input and show appropriate validation message
4. WHEN required fields are empty THEN the system SHALL prevent calculation and indicate missing fields

### Requirement 6

**User Story:** As a user wanting to understand the methodology, I want access to documentation explaining how calculations work, so that I can trust and properly use the tool.

#### Acceptance Criteria

1. WHEN a user accesses help documentation THEN the system SHALL explain why macronutrient values change with cooking
2. WHEN documentation is displayed THEN the system SHALL clarify that total nutrients remain the same but density changes due to water loss
3. WHEN help is accessed THEN the system SHALL provide clear examples of the calculation methodology

### Requirement 7

**User Story:** As a mobile and desktop user, I want a responsive interface that works across all my devices, so that I can use the calculator anywhere.

#### Acceptance Criteria

1. WHEN the application loads on any device THEN the system SHALL display a responsive layout that adapts to screen size
2. WHEN using touch devices THEN the system SHALL provide interactive elements large enough for easy touch interaction
3. WHEN viewing on mobile THEN the system SHALL maintain full functionality and readability
4. WHEN switching between devices THEN the system SHALL preserve user data and state where possible
