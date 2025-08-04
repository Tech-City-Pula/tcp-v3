import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";


const getServerTimestamp = createServerFn({
  method: "GET",
}).handler(() => {
  return {
    serverTime: Date.now()
  }
});

const pingServer = createServerFn({ method: "POST" })
  .handler(() => {
    return {
      serverTime: Date.now()
    }
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getServerTimestamp(),
});

function Home() {
  const loaderData = Route.useLoaderData();
  const [serverTime, setServerTime] = useState(loaderData.serverTime)

  return (
    <div>
      <div>
        <p>server time: {new Date(serverTime).toISOString()}</p>
        <div>Antonio</div>
        <div>Niko</div>
      </div>
    <button
      type="button"
      onClick={async () => {
        const response = await pingServer()

        setServerTime(response.serverTime)
      }}
    >
      get server time
    </button>
    </div>
  );
}
