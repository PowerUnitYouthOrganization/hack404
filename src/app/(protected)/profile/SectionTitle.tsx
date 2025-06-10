import { SectionTitleProps } from "./types";

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <div className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">
    {title}
  </div>
);

export default SectionTitle;
