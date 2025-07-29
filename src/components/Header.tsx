import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

export default function Header() {
	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3">
				<nav className="flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
					>
						<Calculator className="h-6 w-6" />
						Precision Macro Calculator
					</Link>

					<div className="flex items-center gap-4">
						<Link
							to="/"
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Calculator
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
