/**
 * Creates a gradient line or applies a gradient to text.
 * @param {Object} props - Component props.
 * @param {boolean} props.reverse - Whether to reverse the gradient order.
 * @param {React.ReactNode} props.children - Optional children for gradient text.
 */
export default function GradientBorder({
	reverse = false,
	children,
}: {
	reverse?: boolean;
	children?: React.ReactNode;
}) {
	const gradient = reverse
		? "from-[#829A24] via-[#209A9A] to-[#3A2A9A]"
		: "from-[#3A2A9A] via-[#209A9A] to-[#829A24]";

	if (children) {
		return (
			<span
				className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
			>
				{children}
			</span>
		);
	}

	return (
		<div
			className={`p-[1px] rounded-lg bg-gradient-to-r z-0 ${gradient} w-[100vw]`}
		></div>
	);
}
