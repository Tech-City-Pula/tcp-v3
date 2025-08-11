import Newsletter from '@/components/newsletter'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@repo/backend/db'
import { newslatterSubscriptions } from '@repo/backend/schema'
import { z } from 'zod'
import { ZoomIn } from 'lucide-react'


const subscribeToNewletter = createServerFn({
    method:'POST'
    
}).validator(z.object({
    email: z.email()
})).handler(async({
    data
}) => {
    await db.insert(newslatterSubscriptions).values({
        email: data.email
    })
})
export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <Newsletter onSubscribe={
        async (email) => {
            await subscribeToNewletter({
                data: {
                    email
                }
            })
        }
      } />
    </div>
  )
}

