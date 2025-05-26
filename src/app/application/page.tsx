"use client";

import { useState } from "react";

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		birthday: "",
		ethnicity: "",
		school: "",
		hackathons: "",
		dietaryRestrictions: "",
		shirtSize: "",
		avatar: Array.from({ length: 8 }, () => Array(8).fill("#ffffff")),
		failureProud: "",
		forgetLearn: "",
		hackObject: "",
		links: "",
		workshops: [] as string[],
	});

	const [selectedColor, setSelectedColor] = useState("#000000");

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleWorkshopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			workshops: checked
				? [...prev.workshops, value]
				: prev.workshops.filter((w) => w !== value),
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form Data:", formData);
	};

	return (
		<>
			<div className="flex justify-center p-12 bg-gray-100 min-h-screen font-roboto text-black">
				<form
					onSubmit={handleSubmit}
					className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
				>
					<h2 className="mb-4 text-black">
						Hack404 Hacker Application Form
					</h2>

					<div className="flex gap-4 mb-5">
						<div className="flex-1">
							<label
								htmlFor="firstName"
								className="text-base font-medium block text-black"
							>
								What is your first name?
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className="w-full p-3 mt-1.5 mb-5 border border-gray-300 rounded-md text-base text-black"
							/>
						</div>
						<div className="flex-1">
							<label
								htmlFor="lastName"
								className="text-base font-medium block text-black"
							>
								What is your last name?
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className="w-full p-3 mt-1.5 mb-5 border border-gray-300 rounded-md text-base text-black"
							/>
						</div>
					</div>

					<div className="mb-5">
						<label
							htmlFor="birthday"
							className="text-base font-medium block text-black"
						>
							What is your birthday?
						</label>
						<input
							type="date"
							id="birthday"
							name="birthday"
							value={formData.birthday}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="ethnicity"
							className="text-base font-medium block text-black"
						>
							What is your ethnicity?
						</label>
						<input
							type="text"
							id="ethnicity"
							name="ethnicity"
							value={formData.ethnicity}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="school"
							className="text-base font-medium block text-black"
						>
							Which school are you currently attending?
						</label>
						<input
							type="text"
							id="school"
							name="school"
							value={formData.school}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="hackathons"
							className="text-base font-medium block text-black"
						>
							How many hackathons have you attended before?
						</label>
						<input
							type="text"
							id="hackathons"
							name="hackathons"
							value={formData.hackathons}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="dietaryRestrictions"
							className="text-base font-medium block text-black"
						>
							Do you have any allergies/dietary restrictions?
						</label>
						<select
							id="dietaryRestrictions"
							name="dietaryRestrictions"
							value={formData.dietaryRestrictions}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						>
							<option value="">Select an option</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</select>
					</div>

					<div className="mb-5">
						<label
							htmlFor="shirtSize"
							className="text-base font-medium block text-black"
						>
							What is your T-shirt size?
						</label>
						<select
							id="shirtSize"
							name="shirtSize"
							value={formData.shirtSize}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						>
							<option value="">Select a size</option>
							<option value="XS">XS</option>
							<option value="S">S</option>
							<option value="M">M</option>
							<option value="L">L</option>
							<option value="XL">XL</option>
						</select>
					</div>

					<div className="mb-5">
						<label className="text-base font-medium block mb-2 text-black">
							Create your 8x8 avatar (click squares to fill):
						</label>
					</div>

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
								onClick={() => setSelectedColor(color)}
								className={`w-6 h-6 cursor-pointer ${selectedColor === color ? "border-2 border-gray-800" : "border border-gray-400"}`}
								style={{ backgroundColor: color }}
							/>
						))}
					</div>

					<div className="grid grid-cols-8 w-fit border-2 border-gray-300 mb-5">
						{formData.avatar.map((row, rowIndex) =>
							row.map((cell, colIndex) => (
								<div
									key={`${rowIndex}-${colIndex}`}
									onClick={() => {
										const updatedAvatar =
											formData.avatar.map((r, rIdx) =>
												rIdx === rowIndex
													? r.map((c, cIdx) =>
															cIdx === colIndex
																? selectedColor
																: c,
														)
													: r,
											);
										setFormData((prev) => ({
											...prev,
											avatar: updatedAvatar,
										}));
									}}
									className="w-5 h-5 border border-gray-400 cursor-pointer"
									style={{ backgroundColor: cell }}
								/>
							)),
						)}
					</div>

					<div className="mb-5">
						<label
							htmlFor="failureProud"
							className="text-base font-medium block text-black"
						>
							What's something you failed at that you're proud of?
						</label>
						<textarea
							id="failureProud"
							name="failureProud"
							value={formData.failureProud}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="forgetLearn"
							className="text-base font-medium block text-black"
						>
							You wake up one morning and everything you know how
							to do has been '404'd' from your memory. What's the
							first thing you teach yourself again?
						</label>
						<textarea
							id="forgetLearn"
							name="forgetLearn"
							value={formData.forgetLearn}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="hackObject"
							className="text-base font-medium block text-black"
						>
							If you could 'hack' any everyday object (like a
							toaster, a chair, or a backpack), what would you
							hack and what would it do?
						</label>
						<textarea
							id="hackObject"
							name="hackObject"
							value={formData.hackObject}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
						/>
					</div>

					<div className="mb-5">
						<label
							htmlFor="links"
							className="text-base font-medium block text-black"
						>
							Do you have any links you'd like to share?
							(LinkedIn, GitHub, personal website, etc. ||
							separated by commas)
						</label>
						<input
							type="text"
							id="links"
							name="links"
							value={formData.links}
							onChange={handleChange}
							className="w-full p-3 mt-1.5 border border-gray-300 rounded-md text-base text-black"
							placeholder="https://github.com/yourprofile, https://linkedin.com/in/yourname"
						/>
					</div>

					<div className="mb-5">
						<label className="text-base font-medium block text-black">
							What workshops would you like to see at Hack 404?
						</label>
						{[
							"Artificial Intelligence",
							"Web Dev",
							"AI-Assisted Development (e.g. Cursor, vibe coding, prompt engineering)",
							"Entrepreneurship",
							"Hackathon Pitching",
							"UI/UX Design",
							"Project Deployment",
						].map((workshop) => (
							<div key={workshop} className="mb-1.5">
								<label className="text-black">
									<input
										type="checkbox"
										value={workshop}
										checked={formData.workshops.includes(
											workshop,
										)}
										onChange={handleWorkshopChange}
										className="mr-2"
									/>
									{workshop}
								</label>
							</div>
						))}
					</div>

					<div className="text-right">
						<button
							type="submit"
							className="bg-gray-500 text-white px-6 py-3 rounded-md text-base cursor-pointer"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
