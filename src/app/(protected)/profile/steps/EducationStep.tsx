import { StepProps } from "../types";

const EducationStep: React.FC<StepProps> = ({ form, handleChange }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-4">
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <input
          type="text"
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="Secondary/Post Secondary Institution Name"
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-white/50"
        />
      </div>
    </div>
    <div className="self-stretch inline-flex justify-start items-start gap-4">
      <div className="flex-1 p-6 bg-cyan-400/5 border-b border-cyan-400/20 backdrop-blur-xl inline-flex flex-col justify-start items-end gap-6 overflow-hidden">
        <select
          name="grade"
          value={form.grade}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-none outline-none text-white text-sm"
        >
          <option value="" disabled>
            Grade/Year
          </option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
          <option>Year 5+</option>
        </select>
      </div>
    </div>
  </div>
);

export default EducationStep;
