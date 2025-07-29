import { createFileRoute } from "@tanstack/react-router";
import MacroCalculator from "@/components/MacroCalculator";

export const Route = createFileRoute("/")({
	component: () => <MacroCalculator />,
});
