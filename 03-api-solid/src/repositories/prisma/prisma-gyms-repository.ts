import { Gym, Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";
import {
  IFindManyNearbyParams,
  IGymsRepository,
} from "repositories/gyms-repository";

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }
  async findManyNearby({ userLatitude, userLongitude }: IFindManyNearbyParams) {
    return await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE (
                6371 *
                acos(
                    cos( radians(${userLatitude}) ) *
                    cos( radians( latitude ) ) *
                    cos( radians( longitude ) - radians(${userLongitude}) ) +
                    sin( radians(${userLatitude}) ) * sin( radians( latitude ) )
                )
            ) <= 10
        `;
  }
  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({ data });
  }
  async serchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
}
