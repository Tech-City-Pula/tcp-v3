import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const getServerTimestamp = createServerFn({
  method: "GET",
}).handler(() => {
  return {
    serverTime: Date.now(),
  };
});

const pingServer = createServerFn({ method: "POST" }).handler(() => {
  return {
    serverTime: Date.now(),
  };
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getServerTimestamp(),
});

function Home() {
  const loaderData = Route.useLoaderData();
  const [serverTime, setServerTime] = useState(loaderData.serverTime);

  return (
    <div>
      <div>
        <p>server time: {new Date(serverTime).toISOString()}</p>
        <div>Antonio</div>
        <div>matej</div>
        <div>Niko</div>
      </div>
      <Button
        type="button"
        onClick={async () => {
          const response = await pingServer();

          setServerTime(response.serverTime);
        }}
      >
        get server time
      </Button>
      <div>
        <Link to="/events">events</Link>
      </div>
    </div>
  );
}
