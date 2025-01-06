import EventOrderButton from "@/components/event/eventOrderButton";
import LocalEventDate from "@/components/event/localEventDate";
import LocalTicketDate from "@/components/event/localTicketDate";
import TicketDateChecker from "@/components/event/ticketDateChecker";
import rupiah from "@/helpers/toRupiah";
import { getEventId, getEvents } from "@/libs/event";
import { IEvent, IEventHome } from "@/types/types";
import Image from "next/image";
import { IoMdCalendar, IoMdPin, IoMdPricetag } from "react-icons/io";
import { PiTagChevronFill } from "react-icons/pi";

export const generateStaticParams = async () => {
  const events: IEventHome[] = await getEvents();

  return events.map((item) => ({
    id: item.id,
  }));
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event: IEvent = await getEventId(params.id);

  return {
    title: event.title,
    description: event.title,
    authors: event.name,
    openGraph: {
      images: [`${event.thumbnail}`],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event: IEvent = await getEventId(params.id);
  const length = event.Ticket.length;
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 pb-10 pt-20">
      <div className="mt-5 flex flex-col lg:flex-row lg:px-8">
        <div className="aspect-[2/1] w-full overflow-hidden bg-blue-500/10 lg:w-2/3 lg:rounded-md">
          <Image
            className="size-full object-cover object-center text-center lg:rounded-md"
            priority
            src={event.thumbnail}
            width={1500}
            height={750}
            alt={event.id}
          />
        </div>
        <div className="flex flex-col gap-6 px-4 py-3 md:px-8 lg:w-1/3 lg:pl-8 lg:pr-0">
          <div className="flex flex-grow flex-col gap-2 font-semibold">
            <p className="mb-2 text-2xl font-bold">{event.title}</p>
            <div className="flex items-center gap-2">
              <PiTagChevronFill className="size-5" />
              <p>{event.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoMdCalendar className="size-5" />
              <LocalEventDate
                startDate={event.startDate}
                endDate={event.endDate}
              />
            </div>
            <div className="flex items-center gap-2">
              <IoMdPricetag className="size-5" />
              <p>Mulai dari {rupiah(event.minPrice)}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoMdPin className="size-5" />
              <p>{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-blue-500/50 hover:cursor-pointer">
              <Image
                className="rounded-full object-cover object-center"
                src={event.avatar}
                width={100}
                height={100}
                alt={event.name}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Diselenggarakan oleh</p>
              <div className="text-lg font-semibold transition-colors hover:cursor-pointer hover:text-blue-700 hover:underline">
                {event.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:mt-4">
        <div className="flex flex-col gap-2 px-4 md:px-8">
          <p className="text-lg font-semibold">Alamat lokasi Acara</p>
          <p>{event.venue}</p>
          <p className="mt-2 text-lg font-semibold">Deskripsi</p>
          <p>{event.desc}</p>
          <p className="mt-2 text-lg font-semibold">Informasi Tiket</p>
          <div className="mt-2 flex flex-col gap-3">
            {event.Ticket.map((ticket, idx) => {
              const num = idx + 1
              return (
                <div
                  key={idx}
                  className="group mb-6 flex flex-col rounded-bl-xl rounded-tr-xl border-2 border-sky-500 md:w-fit"
                >
                  <div className="flex items-center rounded-tr-lg border-b-2 border-sky-500 bg-sky-600/75 px-4 py-2 transition-colors group-hover:bg-sky-500/75">
                    <p className="text-lg font-semibold text-white">
                      {"(" + num + "/" + length + ") " + ticket.category}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-2 rounded-bl-xl bg-sky-100 px-4 py-4 transition-colors group-hover:bg-sky-50">
                    <p className="rounded-md bg-white/90 px-5 py-2 text-lg font-bold">
                      {rupiah(ticket.price)}
                    </p>
                    <div className="flex flex-col gap-2 md:flex-row md:place-items-center md:gap-8 md:pr-8">
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold">
                          Tanggal penjualan
                        </label>
                        <div className="flex flex-col gap-1 rounded-md bg-white/90 px-5 py-2 text-lg font-bold">
                          <LocalTicketDate
                            startDate={ticket.startDate}
                            endDate={ticket.endDate}
                          />
                          <TicketDateChecker
                            startDate={ticket.startDate}
                            endDate={ticket.endDate}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold">Kuota tiket</label>
                        <div className="w-fit rounded-md bg-white/90 px-5 py-2 text-lg font-bold">
                          {ticket.remainingSeats ? (
                            <div>
                              <span>{ticket.remainingSeats}</span>
                              <span> / </span>
                              <span>{ticket.seats}</span>
                            </div>
                          ) : (
                            <p className="text-rose-600">
                              Tiket terjual habis!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">Deskripsi tiket</label>
                      <p className="rounded-md bg-white/90 px-5 py-2">
                        {ticket.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <EventOrderButton />
      </div>
    </div>
  );
}