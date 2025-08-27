import type { ContactFormValues } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/contact-form';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  const handleSponsorInquiry = (values: ContactFormValues) => {
    console.log('Sponsor inquiry submitted:', values);
    // Additional sponsor-specific handling can go here
    // For example, you could send this to a different endpoint
    // or add additional tracking for sponsor inquiries
  };

  return (
    <div className="min-h-screen bg-black p-4 font-mono text-green-400 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-2 text-sm opacity-70">~/about</div>
          <h1 className="cursor font-bold text-2xl md:text-3xl">$ cat about.md</h1>
        </header>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-lg border-2 border-green-400 bg-gray-900 p-6 md:p-8">
            <div className="text-center">
              <img
                alt="Tech City Pula community"
                className="mx-auto mb-6 w-full max-w-md rounded border border-green-400"
                height="200"
                src="/placeholder.svg?height=200&width=400&text=Tech+City+Pula+Community"
                width="400"
              />
              <h2 className="mb-4 text-green-300 text-xl md:text-2xl">{'> Tech City Pula'}</h2>
              <div className="text-sm opacity-80">
                <p>Location: Pula, Croatia</p>
                <p>Status: Active • Community-driven • Open source</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h3 className="mb-4 text-green-300 text-lg">{'> whoami'}</h3>
          <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
            <div className="space-y-4 text-sm leading-relaxed">
              <p>{'// We are a tech non-profit based in beautiful Pula'}</p>
              <p>
                We love to <span className="font-bold text-green-300">explore new technologies</span> and{' '}
                <span className="font-bold text-green-300">build cool products</span> that make a difference. But most
                importantly, we believe in{' '}
                <span className="font-bold text-green-300">making friends along the way</span>.
              </p>
              <p>
                Our community is built on curiosity, collaboration, and the shared joy of creating something meaningful
                together. Whether you're a seasoned developer or just starting your tech journey, you'll find a
                welcoming space here.
              </p>
              <div className="mt-6 rounded border border-green-400 bg-black p-4">
                <p className="mb-2 font-bold text-green-300">$ ls -la our_values/</p>
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
          <h3 className="mb-4 text-green-300 text-lg">{'> ./meetups --list'}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
              <h4 className="mb-3 font-bold text-green-300">Regular Events</h4>
              <div className="space-y-2 text-sm">
                <p>• Weekly coding sessions</p>
                <p>• Tech talks & workshops</p>
                <p>• Hackathons & project showcases</p>
                <p>• Coffee & code meetups</p>
              </div>
              <div className="mt-4 rounded border border-green-400 bg-black p-3 text-xs">
                <p className="text-green-300">Working hours:</p>
                <p>Mon-Fri: 10:00 - 17:00</p>
                <p>Weekends: Community events</p>
              </div>
            </div>

            <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
              <h4 className="mb-3 font-bold text-green-300">Latest Projects</h4>
              <img
                alt="Recent meetup photos"
                className="mb-3 w-full rounded border border-green-400"
                height="150"
                src="/placeholder.svg?height=150&width=250&text=Hackathon+Photos"
                width="250"
              />
              <p className="text-xs opacity-80">
                Photos from our latest hackathon where we built amazing projects and made new connections in the tech
                community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h3 className="mb-4 text-green-300 text-lg">{'> contact --sponsor-inquiry'}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
              <h4 className="mb-3 font-bold text-green-300">Looking for Sponsors!</h4>
              <div className="space-y-3 text-sm">
                <p>
                  We're actively seeking <span className="font-bold text-green-300">sponsors</span> to help us:
                </p>
                <ul className="space-y-1 pl-4 text-xs">
                  <li>• Host bigger and better meetups</li>
                  <li>• Provide resources for our community</li>
                  <li>• Organize workshops and conferences</li>
                  <li>• Support open source projects</li>
                </ul>
                <p className="font-bold text-green-300">Partner with us to grow Pula's tech ecosystem!</p>

                {/* Sponsorship tiers */}
                <div className="mt-4 space-y-2">
                  <p className="font-bold text-green-300">Sponsorship Tiers:</p>
                  <div className="space-y-1 text-xs">
                    <p>🥉 Bronze: €500/year - Logo on website</p>
                    <p>🥈 Silver: €1000/year - Logo + meetup mentions</p>
                    <p>🥇 Gold: €2500/year - All above + speaking slots</p>
                    <p>💎 Platinum: €5000/year - Premium partnership</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm
                onSuccess={handleSponsorInquiry}
                emailPlaceholder="sponsor@company.com"
                messagePlaceholder="Tell us about your sponsorship ideas or just say hello..."
                submitButtonText="$ send --sponsor-inquiry"
                showCharacterCount={true}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-green-400 border-t pt-6">
          <div className="grid gap-6 text-sm md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-bold text-green-300">$ cat contact_info.json</h4>
              <div className="space-y-1 font-mono text-xs">
                <p>{'{'}</p>
                <p className="pl-4">"location": "Pula, Croatia",</p>
                <p className="pl-4">"email": "hello@techcitypula.org",</p>
                <p className="pl-4">"type": "non-profit"</p>
                <p>{'}'}</p>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-bold text-green-300">$ ls social_links/</h4>
              <div className="space-y-1 text-xs">
                <p>• github.com/techcitypula</p>
                <p>• twitter.com/techcitypula</p>
                <p>• linkedin.com/company/techcitypula</p>
                <p>• discord.gg/techcitypula</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs opacity-60">
            <p>$ echo "Made with ❤️ by the Tech City Pula community"</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
