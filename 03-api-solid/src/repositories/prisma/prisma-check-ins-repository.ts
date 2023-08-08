import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { prisma } from "lib/prisma";
import { ICheckInsRepository } from "repositories/check-ins-repository";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    });

    return checkIn;
  }

  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }

  async findManyByUserId(user_id: string, page: number) {
    return await prisma.checkIn.findMany({
      where: {
        user_id,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async countByUserId(user_id: string) {
    return await prisma.checkIn.count({
      where: {
        user_id,
      },
    });
  }
}
