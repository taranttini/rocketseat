import { IFindManyNearbyParams, IGymsRepository } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async all(): Promise<Gym[]> {
    return this.items;
  }

  async findById(id: String): Promise<Gym | null> {
    const gym = this.items.find((q) => q.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(params: IFindManyNearbyParams) {
    return this.items.filter((q) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.userLatitude,
          longitude: params.userLongitude,
        },
        {
          latitude: q.latitude.toNumber(),
          longitude: q.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }

  async serchMany(query: string, page: number) {
    return this.items
      .filter((q) => q.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
