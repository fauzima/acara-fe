"use client";

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
