"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";

const profileSchema = z.object({
	// Personal Information
	legalFirstName: z.string().min(1, "Legal first name is required"),
	lastName: z.string().min(1, "Last name is required"),
	preferredFirstName: z.string().optional(),
	age: z.string().min(1, "Age is required"),
	gender: z.string().min(1, "Gender is required"),
	ethnicity: z.string().optional(),

	// Education
	institution: z.string().min(1, "Institution is required"),
	gradeYear: z.string().min(1, "Grade/Year is required"),

	// Experience
	hackathonsAttended: z
		.string()
		.min(1, "Number of hackathons attended is required"),

	// Preferences
	tshirtSize: z.string().min(1, "T-shirt size is required"),
	allergies: z.string().optional(),
	dietaryRestrictions: z.string().optional(),

	// Links (all optional but must be valid URLs if provided)
	linkedin: z
		.string()
		.url("Please enter a valid LinkedIn URL")
		.optional()
		.or(z.literal("")),
	github: z
		.string()
		.url("Please enter a valid GitHub URL")
		.optional()
		.or(z.literal("")),
	resume: z
		.string()
		.url("Please enter a valid resume URL")
		.optional()
		.or(z.literal("")),
	portfolio: z
		.string()
		.url("Please enter a valid portfolio URL")
		.optional()
		.or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			legalFirstName: "",
			lastName: "",
			preferredFirstName: "",
			age: "",
			gender: "",
			ethnicity: "",
			institution: "",
			gradeYear: "",
			hackathonsAttended: "",
			tshirtSize: "",
			allergies: "",
			dietaryRestrictions: "",
			linkedin: "",
			github: "",
			resume: "",
			portfolio: "",
		},
	});

	const onSubmit = async (data: ProfileFormData) => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const response = await fetch("/api/profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to save profile");
			}

			setSubmitSuccess(true);

			// Redirect to launchpad after successful submission
			setTimeout(() => {
				window.location.href = "/launchpad";
			}, 1500);
		} catch (error) {
			console.error("Error submitting profile:", error);
			setSubmitError(
				error instanceof Error ? error.message : "An error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Show success message
	if (submitSuccess) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<Card className="max-w-md">
					<CardContent className="pt-6">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-green-600 mb-2">
								Profile Saved!
							</h2>
							<p className="text-gray-600">
								Redirecting to your dashboard...
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">
							profile prototype
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Personal Information */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold border-b pb-2">
										Personal Information
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="legalFirstName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Legal First Name
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="lastName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Last Name
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="preferredFirstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Preferred First Name
												</FormLabel>
												<FormDescription>
													Optional - leave blank if
													same as legal name
												</FormDescription>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="age"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Age</FormLabel>
													<FormControl>
														<Input
															type="number"
															min="13"
															max="100"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="gender"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Gender
													</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select gender" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="male">
																Male
															</SelectItem>
															<SelectItem value="female">
																Female
															</SelectItem>
															<SelectItem value="non-binary">
																Non-binary
															</SelectItem>
															<SelectItem value="prefer-not-to-say">
																Prefer not to
																say
															</SelectItem>
															<SelectItem value="other">
																Other
															</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="ethnicity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Ethnicity</FormLabel>
												<FormDescription>
													Optional
												</FormDescription>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select ethnicity" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="east-asian">
															East Asian
														</SelectItem>
														<SelectItem value="middle-eastern">
															Middle Eastern
														</SelectItem>
														<SelectItem value="south-asian">
															South Asian
														</SelectItem>
														<SelectItem value="southeast-asian">
															Southeast Asian
														</SelectItem>
														<SelectItem value="black">
															Black or African
															American
														</SelectItem>
														<SelectItem value="hispanic">
															Hispanic or Latino
														</SelectItem>
														<SelectItem value="white">
															White
														</SelectItem>
														<SelectItem value="native-american">
															Native American or
															Alaska Native
														</SelectItem>
														<SelectItem value="pacific-islander">
															Native Hawaiian or
															Pacific Islander
														</SelectItem>
														<SelectItem value="other">
															Other
														</SelectItem>
														<SelectItem value="prefer-not-to-say">
															Prefer not to say
														</SelectItem>
													</SelectContent>
												</Select>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Education */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold border-b pb-2">
										Education
									</h3>

									<FormField
										control={form.control}
										name="institution"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Secondary/Post-Secondary
													Institution
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="Your school or university"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="gradeYear"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Grade/Year
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select your grade/year" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="grade-9">
															Grade 9
														</SelectItem>
														<SelectItem value="grade-10">
															Grade 10
														</SelectItem>
														<SelectItem value="grade-11">
															Grade 11
														</SelectItem>
														<SelectItem value="grade-12">
															Grade 12
														</SelectItem>
														<SelectItem value="first-year">
															1st Year University
														</SelectItem>
														<SelectItem value="second-year">
															2nd Year University
														</SelectItem>
														<SelectItem value="third-year">
															3rd Year University
														</SelectItem>
														<SelectItem value="fourth-year">
															4th Year University
														</SelectItem>
														<SelectItem value="fifth-year">
															4th+ Year University
														</SelectItem>
														<SelectItem value="graduate">
															Graduate Student
														</SelectItem>
														<SelectItem value="other">
															Other
														</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Experience & Preferences */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold border-b pb-2">
										Experience & Preferences
									</h3>

									<FormField
										control={form.control}
										name="hackathonsAttended"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Number of Previously
													Attended Hackathons
												</FormLabel>
												<FormControl>
													<Input
														type="number"
														min="0"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="tshirtSize"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													T-shirt Size
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select your t-shirt size" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{[
															"XS",
															"S",
															"M",
															"L",
															"XL",
															"XXL",
														].map((size) => (
															<SelectItem
																key={size}
																value={size}
															>
																{size}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="allergies"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Allergies
													</FormLabel>
													<FormDescription>
														Optional
													</FormDescription>
													<FormControl>
														<Textarea {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="dietaryRestrictions"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Dietary Restrictions
													</FormLabel>
													<FormDescription>
														Optional
													</FormDescription>
													<FormControl>
														<Textarea {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* Links */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold border-b pb-2">
										Links (Optional)
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="linkedin"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														LinkedIn
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="https://linkedin.com/in/..."
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="github"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														GitHub
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="https://github.com/..."
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="resume"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Resume Link
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="https://..."
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="portfolio"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Portfolio
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="https://..."
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting
										? "Saving Profile..."
										: "Complete Profile"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
