export interface IAcc {
  id: string
  role: "user" | "promotor";
  name: string;
  email: string;
  avatar: string;
  refCode: string
  createdAt: string
  updatedAt: string
  sumdata: number[]
  isVerified: boolean
}
