export interface IEventHome {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  startDate: string;
  price: number;
  promotorId: string;
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
  earliestTicket: string;
  latestTicket: string;
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

export interface IBonus {
  UserCoupon: [id: string];
  UserPoint: [id: string];
}
