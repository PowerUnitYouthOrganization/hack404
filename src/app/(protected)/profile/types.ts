export interface FormData {
  firstName: string;
  lastName: string;
  preferredName?: string;
  age?: string;
  gender?: string;
  ethnicity?: string;
  pronouns: string;
  school: string;
  grade: string;
  previousHackathons: string;
  shirtSize: string;
  allergies: string;
  dietaryRestrictions: string;
  linkedin: string;
  github: string;
  resume: string;
  portfolio: string;
}

export interface StepProps {
  form: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export interface SectionTitleProps {
  title: string;
}
