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
    ? "from-[#C3F73A] via-[#30F2F2] to-[#5E4AE3]"
    : "from-[#5E4AE3] via-[#30F2F2] to-[#C3F73A]";

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
      className={`z-0 rounded-lg bg-gradient-to-r p-[1px] ${gradient} w-[100vw]`}
    ></div>
  );
}
