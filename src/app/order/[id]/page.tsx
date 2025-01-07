import { getEventId } from "@/libs/event";
import { IEvent } from "@/types/types";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event: IEvent = await getEventId(params.id);
  return (
    <div className="mx-auto flex max-w-screen-xl items-center px-4 py-20 md:px-8">
      <p className="text-transparent">{event.name}</p>
    </div>
  );
}
