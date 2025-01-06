export interface IEventHome {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  startDate: string;
  price: number;
  avatar: string;
  name: string;
}

export interface IEvent {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  minPrice: number;
  location: string;
  venue: string;
  desc: string;
  name: string;
  avatar: string;
  Ticket: [
    {
      category: string;
      price: number;
      startDate: string;
      endDate: string;
      seats: number;
      remainingSeats: number;
      desc: string;
    },
  ];
}
