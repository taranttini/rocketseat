import { Gym, Prisma } from "@prisma/client";

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  serchMany(query: string, page: number): Promise<Gym[]>;
}
