import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <div>
        {/* Header */}
        <header>
          <div>~/about</div>
          <h1>$ cat about.md</h1>
        </header>

        {/* Hero Section */}
        <section>
          <div>
            <div>
              <img
                alt="Tech City Pula community"
                height="200"
                src="/placeholder.svg?height=200&width=400&text=Tech+City+Pula+Community"
                width="400"
              />
              <h2>{'> Tech City Pula'}</h2>
              <div>
                <p>Location: Pula, Croatia</p>
                <p>Status: Active • Community-driven • Open source</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h3>{'> whoami'}</h3>
          <div>
            <div>
              <p>{'// We are a tech non-profit based in beautiful Pula'}</p>
              <p>
                We love to <span>explore new technologies</span> and{' '}
                <span>build cool products</span> that make a difference. But most
                importantly, we believe in{' '}
                <span>making friends along the way</span>.
              </p>
              <p>
                Our community is built on curiosity, collaboration, and the shared joy of creating something meaningful
                together. Whether you're a seasoned developer or just starting your tech journey, you'll find a
                welcoming space here.
              </p>
              <div>
                <p>$ ls -la our_values/</p>
                <ul>
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
        <section>
          <h3>{'> ./meetups --list'}</h3>
          <div>
            <div>
              <h4>Regular Events</h4>
              <div>
                <p>• Weekly coding sessions</p>
                <p>• Tech talks & workshops</p>
                <p>• Hackathons & project showcases</p>
                <p>• Coffee & code meetups</p>
              </div>
              <div>
                <p>Working hours:</p>
                <p>Mon-Fri: 10:00 - 17:00</p>
                <p>Weekends: Community events</p>
              </div>
            </div>

            <div>
              <h4>Latest Projects</h4>
              <img
                alt="Recent meetup photos"
                height="150"
                src="/placeholder.svg?height=150&width=250&text=Hackathon+Photos"
                width="250"
              />
              <p>
                Photos from our latest hackathon where we built amazing projects and made new connections in the tech
                community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h3>{'> contact --sponsor-inquiry'}</h3>
          <div>
            <div>
              <h4>Looking for Sponsors!</h4>
              <div>
                <p>
                  We're actively seeking <span>sponsors</span> to help us:
                </p>
                <ul>
                  <li>• Host bigger and better meetups</li>
                  <li>• Provide resources for our community</li>
                  <li>• Organize workshops and conferences</li>
                  <li>• Support open source projects</li>
                </ul>
                <p>Partner with us to grow Pula's tech ecosystem!</p>
              </div>
            </div>

            <div>
              {/* <ContactForm
                onSuccess={sponsor_inquiry}
                emailPlaceholder="sponsor@company.com"
                messagePlaceholder="Tell us about your sponsorship ideas or just say hello..."
                submitButtonText="$ send --sponsor-inquiry"
                showCharacterCount={true}
              /> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
