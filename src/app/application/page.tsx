"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	// Demographics (required)
	age: z.string().min(1, "Age is required for waiver purposes"),
	gender: z.string().min(1, "Gender is required"),
	ethnicity: z.string(),
	school: z.string().min(1, "School is required"),
	hackathonsAttended: z.string(),
	shirtSize: z.string().min(1, "Shirt size is required"),
	dietaryRestrictions: z.string(),

	// Links (optional)
	linkedin: z.string().url().optional().or(z.literal("")),
	github: z.string().url().optional().or(z.literal("")),
	resume: z.string().url().optional().or(z.literal("")),
	portfolio: z.string().url().optional().or(z.literal("")),

	// Short answers
	failureProud: z.string().max(150, "Maximum 150 words"),
	forgetLearn: z.string().max(150, "Maximum 150 words"),

	// Avatar
	avatar: z.array(z.array(z.string().min(7).max(7))).optional(),
	workshops: z.array(z.string()),
});

export default function RegistrationForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			age: "",
			gender: "",
			ethnicity: "",
			school: "",
			hackathonsAttended: "",
			shirtSize: "",
			dietaryRestrictions: "",
			linkedin: "",
			github: "",
			resume: "",
			portfolio: "",
			failureProud: "",
			forgetLearn: "",
			avatar: Array.from({ length: 8 }, () => Array(8).fill("#ffffff")),
			workshops: [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const [avatar, setAvatar] = useState<string[][]>(
		Array.from({ length: 8 }, () => Array(8).fill("#ffffff")),
	);
	const [selectedColor, setSelectedColor] = useState<string>("#3e4da3");

	const workshops = [
		"Artificial Intelligence",
		"Web Development",
		"AI-Assisted Development",
		"Entrepreneurship",
		"Hackathon Pitching",
		"UI/UX Design",
		"Project Deployment",
	];

	return (
		<div className="flex justify-center p-12 bg-gray-100 min-h-screen">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>Hack404 Hacker Application Form</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							{/* Demographics Section */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									Demographics
								</h3>

								<FormField
									control={form.control}
									name="age"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Age</FormLabel>
											<FormDescription>
												Required for waiver purposes
											</FormDescription>
											<FormControl>
												<Input
													type="number"
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
											<FormLabel>Gender</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your gender" />
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
														Prefer not to say
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

								<FormField
									control={form.control}
									name="ethnicity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ethnicity</FormLabel>
											<FormDescription>
												Optional. Used for diversity
												metrics and reporting.
											</FormDescription>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="school"
									render={({ field }) => (
										<FormItem>
											<FormLabel>School</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Your current school"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="hackathonsAttended"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												How many hackathons have you
												attended before?
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
									name="shirtSize"
									render={({ field }) => (
										<FormItem>
											<FormLabel>T-shirt Size</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your size" />
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

								<FormField
									control={form.control}
									name="dietaryRestrictions"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Allergies & Dietary Restrictions
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Please list any allergies or dietary restrictions"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Links Section */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									Links (Optional)
								</h3>

								<FormField
									control={form.control}
									name="linkedin"
									render={({ field }) => (
										<FormItem>
											<FormLabel>LinkedIn</FormLabel>
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
											<FormLabel>GitHub</FormLabel>
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

								<FormField
									control={form.control}
									name="resume"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Resume Link</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Link to your resume"
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
											<FormLabel>Portfolio</FormLabel>
											<FormDescription>
												DevPost, DoraHacks, or personal
												website
											</FormDescription>
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

							{/* Short Answer Section */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									Short Answer Questions
								</h3>
								<FormDescription>
									Maximum 150 words per answer
								</FormDescription>

								<FormField
									control={form.control}
									name="failureProud"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												What's something you failed at
												that you're proud of?
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													className="min-h-[100px]"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="forgetLearn"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												You wake up one morning and
												everything you know how to do
												has been '404'd' from your
												memory. What's the first thing
												you teach yourself again?
											</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													className="min-h-[100px]"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Avatar section */}
							<FormItem>
								<FormLabel>Draw yourself an avatar!</FormLabel>
								<div className="flex gap-2.5 mb-4">
									{[
										"#3e4da3",
										"#ffffff",
										"#000000",
										"#acf652",
										"#d3d3d3",
										"#27cecd",
									].map((color) => (
										<div
											key={color}
											onClick={() =>
												setSelectedColor(color)
											}
											className={`w-6 h-6 cursor-pointer rounded-md ${
												selectedColor === color
													? "ring-2 ring-offset-2 ring-primary"
													: "ring-1"
											}`}
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
								<div className="border-1">
									<div className="grid grid-cols-8 gap-0 w-fit rounded-0">
										{avatar.map((row, rowIndex) =>
											row.map((cell, colIndex) => (
												<div
													key={`${rowIndex}-${colIndex}`}
													onClick={() => {
														const newAvatar = [
															...avatar,
														];
														newAvatar[rowIndex][
															colIndex
														] = selectedColor;
														setAvatar(newAvatar);
													}}
													className="w-6 h-6 cursor-pointer"
													style={{
														backgroundColor: cell,
													}}
												/>
											)),
										)}
									</div>
								</div>
							</FormItem>

							{/* Workshop checkboxes */}
							<FormField
								control={form.control}
								name="workshops"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											What workshops would you like to see
											at Hack 404?
										</FormLabel>
										<div className="grid gap-2">
											{workshops.map((workshop) => (
												<div
													key={workshop}
													className="flex items-center space-x-3"
												>
													<Checkbox
														checked={field.value?.includes(
															workshop,
														)}
														onCheckedChange={(
															checked,
														) => {
															const updatedWorkshops =
																checked
																	? [
																			...(field.value ||
																				[]),
																			workshop,
																		]
																	: field.value?.filter(
																			(
																				value,
																			) =>
																				value !==
																				workshop,
																		);
															field.onChange(
																updatedWorkshops,
															);
														}}
													/>
													<FormLabel className="font-normal">
														{workshop}
													</FormLabel>
												</div>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full">
								Submit Application
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
