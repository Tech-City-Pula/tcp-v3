import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <div>
        <header>
          <div>~/home</div>
          <h1>$ echo "Welcome to Tech City Pula"</h1>
        </header>

        <section>
          <div>
            <h2>{'> whoami'}</h2>
            <p>
              We are a tech community based in Pula, Croatia, bringing together developers, designers, and tech
              enthusiasts to learn, build, and grow together.
            </p>
          </div>
        </section>

        <section>
          <div>
            <h3>{'> ls -la sections/'}</h3>
            <div>
              <div>
                <h4>About</h4>
                <p>Learn more about our community and mission</p>
              </div>
              <div>
                <h4>Events</h4>
                <p>Join our upcoming meetups and workshops</p>
              </div>
              <div>
                <h4>Blog</h4>
                <p>Read articles and insights from our community</p>
              </div>
              <div>
                <h4>Learn</h4>
                <p>Access curated resources and documentation</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
