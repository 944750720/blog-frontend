import { BackToTop } from "@/components/layout/BackToTop";
import { SideBar } from "@/components/layout/SideBar";

interface ContentLayoutProps {
	header?: React.ReactNode;
	children: React.ReactNode;
	sidebar?: React.ReactNode;
	sidebarTitle?: string;
}

export function ContentLayout({
	header,
	children,
	sidebar,
	sidebarTitle,
}: ContentLayoutProps) {
	return (
		<>
			<div className="md:flex items-start gap-x-10">
				{header && (
					<div
						className="animate fade-in-up min-w-0 grow"
						style={{ animationDelay: "50ms" }}
					>
						{header}
					</div>
				)}
				<div
					className="animate fade-in-up min-w-0 grow md:min-w-[45ch]"
					style={{ animationDelay: "100ms" }}
				>
					{children}
				</div>
				{sidebar && (
					<div
						className="animate fade-in-up"
						style={{ animationDelay: "150ms" }}
					>
						<SideBar title={sidebarTitle}>{sidebar}</SideBar>
					</div>
				)}
			</div>
			<BackToTop />
		</>
	);
}
