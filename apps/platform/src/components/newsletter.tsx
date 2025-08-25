import { useForm } from "@tanstack/react-form";
import { type FormEventHandler, useCallback } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { cn } from "@/lib/utils";
import {
	emailSchema,
	type NewsletterInput,
	newsletterSchema,
} from "../lib/validation";

export interface NewsletterProps {
	onSubscribe?: (email: string) => void | Promise<void>;
	placeholder?: string;
	buttonLabel?: string;
	className?: string;
}

const defaultNewsletterInfo: NewsletterInput = { email: "" } as const;

export default function Newsletter({
	onSubscribe,
	placeholder = "Enter your email",
	buttonLabel = "SUBSCRIBE",
	className,
}: NewsletterProps) {
	const form = useForm({
		defaultValues: defaultNewsletterInfo,
		validators: {
			onSubmit: newsletterSchema,
		},
		async onSubmit(props) {
			try {
				if (onSubscribe) {
					await onSubscribe(props.value.email);
				} else {
					// If no onSubscribe function is provided, just show success
					// This can happen during development or if the component is used standalone
					console.log("Newsletter subscription for:", props.value.email);
				}

				toast.success("Successfully subscribed to newsletter!");
				form.reset();
			} catch (error) {
				console.error("Newsletter subscription error:", error);

				// Handle different types of errors
				if (error instanceof Error) {
					// Check if user is already subscribed (database constraint violation)
					if (
						error.message.toLowerCase().includes("already subscribed") ||
						error.message.toLowerCase().includes("already registered") ||
						error.message.toLowerCase().includes("duplicate") ||
						error.message.includes('insert into "newsletter_subscriptions"') ||
						error.message.toLowerCase().includes("unique constraint") ||
						error.message.toLowerCase().includes("constraint violation")
					) {
						toast.error("You are already subscribed to the newsletter.");
					} else {
						toast.error(error.message);
					}
				} else if (error instanceof ZodError) {
					toast.error("Please check your email format.");
				} else if (typeof error === "string") {
					toast.error(error);
				} else {
					toast.error("An unknown error occurred");
				}
			}
		},
	});

	const handleFormSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
		async (e) => {
			e.preventDefault();
			await form.handleSubmit();
		},
		[form.handleSubmit],
	);

	return (
		<section className="mx-auto max-w-4xl px-8 pb-16 text-center">
			<form
				className={cn("mx-auto max-w-md", className)}
				onSubmit={handleFormSubmit}
				noValidate
			>
				<form.Field
					name="email"
					validators={{
						onChange: emailSchema,
					}}
				>
					{(field) => (
						<div className="flex flex-col gap-2 mb-2">
							<label
								className="block text-left font-mono text-emerald-400"
								htmlFor={field.name}
							>
								Subscribe to our newsletter:
							</label>
							<input
								autoComplete="email"
								className="w-full rounded border border-emerald-500 bg-black p-3 text-emerald-200 focus:border-emerald-400 focus:outline-none"
								id={field.name}
								name={field.name}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={placeholder}
								type="email"
								value={field.state.value}
							/>
							<div
								className={cn(
									"min-h-[3rem] text-left font-mono text-red-400 text-sm",
									field.state.meta.errors.length === 0 && "invisible",
								)}
							>
								{field.state.meta.errors.map((err, index) => (
									<div key={index}>{err?.message}</div>
								))}
							</div>
						</div>
					)}
				</form.Field>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<button
							className="w-full rounded border-2 border-emerald-500 bg-black px-8 py-3 font-bold font-mono text-emerald-500 text-lg transition-all duration-300 hover:bg-emerald-500 hover:text-black disabled:opacity-60"
							disabled={!canSubmit || isSubmitting || !form.state.isDirty}
							type="submit"
						>
							{isSubmitting ? "Submitting…" : buttonLabel}
						</button>
					)}
				</form.Subscribe>
			</form>
		</section>
	);
}
