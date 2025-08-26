import type { ContactFormValues } from '@repo/backend/schema';
import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/ContactForm';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const handleContactSuccess = (values: ContactFormValues) => {
    console.log('Contact form submitted successfully:', values);
    // Additional success handling can go here
  };

  return (
    <div className="min-h-screen bg-black p-4 font-mono text-green-400 md:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <div className="mb-2 text-sm opacity-70">~/contact</div>
          <h1 className="font-bold text-2xl md:text-3xl">$ cat contact.md</h1>
        </header>

        <section className="mb-8">
          <h3 className="mb-4 text-green-300 text-lg">{'> contact --get-in-touch'}</h3>
          <ContactForm
            onSuccess={handleContactSuccess}
            emailPlaceholder="your@email.com"
            messagePlaceholder="Type your message here..."
            submitButtonText="$ send --message"
            showCharacterCount={true}
          />
        </section>

        {/* Additional contact information */}
        <section className="mb-8">
          <h3 className="mb-4 text-green-300 text-lg">{'> cat contact_info.json'}</h3>
          <div className="rounded-lg border border-green-400 bg-gray-900 p-6">
            <div className="space-y-2 font-mono text-sm">
              <p>{'{'}</p>
              <p className="pl-4">"email": "hello@techcitypula.org",</p>
              <p className="pl-4">"location": "Pula, Croatia",</p>
              <p className="pl-4">"response_time": "24-48 hours",</p>
              <p className="pl-4">"office_hours": "Mon-Fri 09:00-17:00 CET"</p>
              <p>{'}'}</p>
            </div>
          </div>
        </section>

        {/* Social links */}
        <section className="mb-8">
          <h3 className="mb-4 text-green-300 text-lg">{'> ls social_links/'}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-400 bg-gray-900 p-4">
              <h4 className="mb-2 font-bold text-green-300">Development</h4>
              <div className="space-y-1 text-sm">
                <p>• github.com/techcitypula</p>
                <p>• discord.gg/techcitypula</p>
              </div>
            </div>
            <div className="rounded-lg border border-green-400 bg-gray-900 p-4">
              <h4 className="mb-2 font-bold text-green-300">Social Media</h4>
              <div className="space-y-1 text-sm">
                <p>• twitter.com/techcitypula</p>
                <p>• linkedin.com/company/techcitypula</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
