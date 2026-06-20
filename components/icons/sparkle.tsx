export function Sparkle({
	className,
	"aria-label": ariaLabel,
}: {
	className?: string;
	"aria-label"?: string;
}) {
	return (
		<svg
			viewBox="0 0 100 100"
			fill="currentColor"
			className={className}
			aria-hidden={!ariaLabel}
			aria-label={ariaLabel}
		>
			{ariaLabel && <title>{ariaLabel}</title>}
			<path d="M50 0C50 30 70 50 100 50C70 50 50 70 50 100C50 70 30 50 0 50C30 50 50 30 50 0Z" />
		</svg>
	);
}
