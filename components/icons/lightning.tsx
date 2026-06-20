export function Lightning({
	className,
	"aria-label": ariaLabel,
}: {
	className?: string;
	"aria-label"?: string;
}) {
	return (
		<svg
			viewBox="0 0 24 32"
			fill="currentColor"
			className={className}
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
		>
			{ariaLabel && <title>{ariaLabel}</title>}
			<path d="M14 0L4 16h7l-3 16 14-20h-8z" />
		</svg>
	);
}
