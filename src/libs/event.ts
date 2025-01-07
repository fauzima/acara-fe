const base_url = process.env.NEXT_PUBLIC_BASE_URL_FE!;

export const getEvents = async () => {
  const res = await fetch(`${base_url}/api/events`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.events;
};

export const getEventId = async (id: string) => {
  const res = await fetch(`${base_url}/api/events/${id}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.event;
};

export const getEventsPromotor = async (type: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/promotors/events?type=${type}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    const result = await res.json();
    console.log("getEvents", result.result);

    return result.result;
  } catch (error) {
    console.log(error);
  }
};