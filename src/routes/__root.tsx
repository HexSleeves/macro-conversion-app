import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

/**
 * Root layout component that provides the main application structure
 * Includes global navigation and layout for all routes
 */
function RootComponent() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
