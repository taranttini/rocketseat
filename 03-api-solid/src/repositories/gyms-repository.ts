import { Gym, Prisma } from "@prisma/client";

export interface IFindManyNearbyParams {
  userLatitude: number;
  userLongitude: number;
}

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  serchMany(query: string, page: number): Promise<Gym[]>;
}
