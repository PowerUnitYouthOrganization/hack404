"use client";

import { useEffect, useState } from "react";
import { avatarToCanvas, canvasToBlob } from "@/lib/avatar-to-image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
	// Short answers
	failureProud: z.string().max(150, "Maximum 150 words"),
	forgetLearn: z.string().max(150, "Maximum 150 words"),

	// Avatar
	avatar: z.array(z.array(z.string().min(7).max(7))).optional(),
	workshops: z.array(z.string()),
});

export default function RegistrationForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			failureProud: "",
			forgetLearn: "",
			avatar: Array.from({ length: 8 }, () => Array(8).fill("#ffffff")),
			workshops: [],
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsSubmitting(true);

			// Convert avatar to canvas and blob
			const canvas = avatarToCanvas(avatar);
			const blob = await canvasToBlob(canvas);

			// Create form data
			const formData = new FormData();
			formData.append("failureProud", values.failureProud);
			formData.append("forgetLearn", values.forgetLearn);
			formData.append("workshops", JSON.stringify(values.workshops));
			formData.append("avatarPixels", JSON.stringify(avatar));
			formData.append("avatar", blob, "avatar.png");

			// Submit to API
			const response = await fetch("/api/upload-application", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Failed to submit application",
				);
			}

			const result = await response.json();
			console.log("Application submitted:", result);

			// Show success message or redirect
			alert("Application submitted successfully!");
			// window.location.href = '/launchpad';
		} catch (error) {
			console.error("Error submitting application:", error);
			alert("Failed to submit application. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
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