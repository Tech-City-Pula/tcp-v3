import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()

  return <div>Hello "/blog/$slug"!</div>
}
