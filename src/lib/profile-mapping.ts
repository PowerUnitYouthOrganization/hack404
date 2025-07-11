import { FormData } from "@/app/(protected)/profile/types";

export function mapFormDataToProfile(formData: FormData, userId: string) {
  return {
    userId,
    firstName: formData.firstName,
    preferredFirstName: formData.preferredName || null,
    lastName: formData.lastName,
    age:
      formData.age && formData.age.trim() !== "" ? parseInt(formData.age) : 0,
    gender: formData.gender || "",
    ethnicity: formData.ethnicity || "",
    institution: formData.school,
    year: formData.grade,
    attendedHackathons:
      formData.previousHackathons && formData.previousHackathons.trim() !== ""
        ? parseInt(formData.previousHackathons)
        : 0,
    shirtSize: formData.shirtSize,
    dietaryRestrictions: formData.dietaryRestrictions || null,
    allergies: formData.allergies || null,
    linkedin: formData.linkedin || null,
    github: formData.github || null,
    portfolio: formData.portfolio || null,
    resume: formData.resume || null,
  };
}
