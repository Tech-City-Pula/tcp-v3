import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '@/components/contact-form'

export const Route = createFileRoute('/contact')({
  component: () => (
    <main className="min-h-screen bg-black text-emerald-500">
      <div className="py-12">
        <ContactForm />
      </div>
    </main>
  ),
})
