import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", { email, message });
		// Handle form submission here
	};

	return (
		<div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<header className="mb-8">
					<div className="text-sm mb-2 opacity-70">~/about</div>
					<h1 className="text-2xl md:text-3xl font-bold cursor">
						$ cat about.md
					</h1>
				</header>

				{/* Hero Section */}
				<section className="mb-12">
					<div className="bg-gray-900 border-green-400 border-2 p-6 md:p-8 rounded-lg">
						<div className="text-center">
							<img
								src="/placeholder.svg?height=200&width=400&text=Tech+City+Pula+Community"
								alt="Tech City Pula community"
								className="w-full max-w-md mx-auto mb-6 rounded border border-green-400"
							/>
							<h2 className="text-xl md:text-2xl mb-4 text-green-300">
								{"> Tech City Pula"}
							</h2>
							<div className="text-sm opacity-80">
								<p>Location: Pula, Croatia</p>
								<p>Status: Active • Community-driven • Open source</p>
							</div>
						</div>
					</div>
				</section>

				{/* About Section */}
				<section className="mb-12">
					<h3 className="text-lg mb-4 text-green-300">{"> whoami"}</h3>
					<div className="bg-gray-900 border-green-400 border p-6 rounded-lg">
						<div className="space-y-4 text-sm leading-relaxed">
							<p>{"// We are a tech non-profit based in beautiful Pula"}</p>
							<p>
								We love to{" "}
								<span className="text-green-300 font-bold">
									explore new technologies
								</span>{" "}
								and{" "}
								<span className="text-green-300 font-bold">
									build cool products
								</span>{" "}
								that make a difference. But most importantly, we believe in{" "}
								<span className="text-green-300 font-bold">
									making friends along the way
								</span>
								.
							</p>
							<p>
								Our community is built on curiosity, collaboration, and the
								shared joy of creating something meaningful together. Whether
								you're a seasoned developer or just starting your tech journey,
								you'll find a welcoming space here.
							</p>
							<div className="mt-6 p-4 bg-black border border-green-400 rounded">
								<p className="text-green-300 font-bold mb-2">
									$ ls -la our_values/
								</p>
								<ul className="space-y-1 text-xs">
									<li>• innovation.js - Always exploring cutting-edge tech</li>
									<li>• community.py - Building lasting friendships</li>
									<li>• openness.md - Welcoming all skill levels</li>
									<li>• impact.rs - Creating products that matter</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Meetups Section */}
				<section className="mb-12">
					<h3 className="text-lg mb-4 text-green-300">
						{"> ./meetups --list"}
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-gray-900 border-green-400 border p-6 rounded-lg">
							<h4 className="text-green-300 font-bold mb-3">Regular Events</h4>
							<div className="space-y-2 text-sm">
								<p>• Weekly coding sessions</p>
								<p>• Tech talks & workshops</p>
								<p>• Hackathons & project showcases</p>
								<p>• Coffee & code meetups</p>
							</div>
							<div className="mt-4 p-3 bg-black border border-green-400 rounded text-xs">
								<p className="text-green-300">Working hours:</p>
								<p>Mon-Fri: 10:00 - 17:00</p>
								<p>Weekends: Community events</p>
							</div>
						</div>

						<div className="bg-gray-900 border-green-400 border p-6 rounded-lg">
							<h4 className="text-green-300 font-bold mb-3">Latest Projects</h4>
							<img
								src="/placeholder.svg?height=150&width=250&text=Hackathon+Photos"
								alt="Recent meetup photos"
								className="w-full mb-3 rounded border border-green-400"
							/>
							<p className="text-xs opacity-80">
								Photos from our latest hackathon where we built amazing projects
								and made new connections in the tech community.
							</p>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section className="mb-8">
					<h3 className="text-lg mb-4 text-green-300">
						{"> contact --sponsor-inquiry"}
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-gray-900 border-green-400 border p-6 rounded-lg">
							<h4 className="text-green-300 font-bold mb-3">
								Looking for Sponsors!
							</h4>
							<div className="space-y-3 text-sm">
								<p>
									We're actively seeking{" "}
									<span className="text-green-300 font-bold">sponsors</span> to
									help us:
								</p>
								<ul className="space-y-1 text-xs pl-4">
									<li>• Host bigger and better meetups</li>
									<li>• Provide resources for our community</li>
									<li>• Organize workshops and conferences</li>
									<li>• Support open source projects</li>
								</ul>
								<p className="text-green-300 font-bold">
									Partner with us to grow Pula's tech ecosystem!
								</p>
							</div>
						</div>

						<div className="bg-gray-900 border-green-400 border p-6 rounded-lg">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label className="block text-sm text-green-300 mb-2">
										$ echo "your-email" {">"} contact.txt
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full bg-black border-green-400 border text-green-400 placeholder-green-600 font-mono p-2 rounded"
										placeholder="your@email.com"
										required
									/>
								</div>
								<div>
									<label className="block text-sm text-green-300 mb-2">
										$ vim message.txt
									</label>
									<textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										className="w-full bg-black border-green-400 border text-green-400 placeholder-green-600 font-mono min-h-[100px] p-2 rounded"
										placeholder="Tell us about your sponsorship ideas or just say hello..."
										required
									/>
									<div className="text-xs text-green-600 mt-1">
										{message.length}/500 chars
									</div>
								</div>
								<button
									type="submit"
									className="w-full bg-green-400 text-black hover:bg-green-300 font-mono font-bold p-2 rounded transition-colors"
								>
									$ send --message
								</button>
							</form>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t border-green-400 pt-6">
					<div className="grid md:grid-cols-2 gap-6 text-sm">
						<div>
							<h4 className="text-green-300 font-bold mb-2">
								$ cat contact_info.json
							</h4>
							<div className="space-y-1 text-xs">
								<p>{"{"}</p>
								<p className="pl-4">"location": "Pula, Croatia",</p>
								<p className="pl-4">"email": "hello@techcitypula.org",</p>
								<p className="pl-4">"type": "non-profit"</p>
								<p>{"}"}</p>
							</div>
						</div>
						<div>
							<h4 className="text-green-300 font-bold mb-2">
								$ ls social_links/
							</h4>
							<div className="space-y-1 text-xs">
								<p>• github.com/techcitypula</p>
								<p>• twitter.com/techcitypula</p>
								<p>• linkedin.com/company/techcitypula</p>
								<p>• discord.gg/techcitypula</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-6 text-xs opacity-60">
						<p>$ echo "Made with ❤️ by the Tech City Pula community"</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
