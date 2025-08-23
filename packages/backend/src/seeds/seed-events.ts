import 'dotenv/config';
import { db } from '../db.ts';
import { events } from '../schema.ts';

async function seedEvents() {
  console.log('Seeding events...');

  const sampleEvents = [
    {
      title: 'Tech Meetup #1',
      description:
        "Join us for our first tech meetup in Pula. We'll discuss web development trends and network with fellow developers.",
      eventAt: new Date('2025-09-15T18:00:00Z'),
      location: 'Pula Tech Hub',
    },
    {
      title: 'React Workshop',
      description:
        'Hands-on React workshop for beginners and intermediate developers. Learn hooks, state management, and best practices.',
      eventAt: new Date('2025-09-22T14:00:00Z'),
      location: 'Innovation Center Pula',
    },
    {
      title: 'AI & Machine Learning Conference',
      description:
        'Explore the latest developments in artificial intelligence and machine learning with industry experts.',
      eventAt: new Date('2025-10-05T09:00:00Z'),
      location: 'Pula Convention Center',
    },
  ];

  try {
    const insertedEvents = await db.insert(events).values(sampleEvents).returning();
    console.log('Events seeded successfully:', insertedEvents.length);

    for (const event of insertedEvents) {
      console.log(`- ${event.title} (ID: ${event.id})`);
    }
  } catch (error) {
    console.error('Error seeding events:', error);
  }
}

seedEvents()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
