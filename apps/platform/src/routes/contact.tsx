import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/contact-form';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <div>
        <header>
          <div>~/contact</div>
          <h1>$ cat contact.md</h1>
        </header>

        <section>
          <h3>{'> contact --get-in-touch'}</h3>
          <ContactForm
            onSuccess={() => {
              /* no-op */
            }}
            emailPlaceholder="your@email.com"
            messagePlaceholder="Type your message here..."
            submitButtonText="$ send --message"
            showCharacterCount={true}
          />
        </section>

        {/* Additional contact information */}
        <section>
          <h3>{'> cat contact_info.json'}</h3>
          <div>
            <div>
              <p>{'{'}</p>
              <p>"email": "hello@techcitypula.org",</p>
              <p>"location": "Pula, Croatia",</p>
              <p>"response_time": "24-48 hours",</p>
              <p>"office_hours": "Mon-Fri 09:00-17:00 CET"</p>
              <p>{'}'}</p>
            </div>
          </div>
        </section>

        {/* Social links */}
        <section>
          <h3>{'> ls social_links/'}</h3>
          <div>
            <div>
              <h4>Development</h4>
              <div>
                <p>• github.com/techcitypula</p>
                <p>• discord.gg/techcitypula</p>
              </div>
            </div>
            <div>
              <h4>Social Media</h4>
              <div>
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
