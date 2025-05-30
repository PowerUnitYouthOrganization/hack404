import { ProfileFormData } from "@/app/(protected)/profile/page";

export function mapFormDataToProfile(formData: ProfileFormData, userId: string) {
    return {
        userId,
        firstName: formData.legalFirstName,
        preferredFirstName: formData.preferredFirstName || null,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        gender: formData.gender,
        ethnicity: formData.ethnicity || "", // Handle optional field
        institution: formData.institution,
        year: formData.gradeYear,
        attendedHackathons: parseInt(formData.hackathonsAttended),
        shirtSize: formData.tshirtSize,
        dietaryRestrictions: formData.dietaryRestrictions || null,
        allergies: formData.allergies || null,
        linkedin: formData.linkedin || null,
        github: formData.github || null,
        portfolio: formData.portfolio || null,
        resume: formData.resume || null,
    };
}