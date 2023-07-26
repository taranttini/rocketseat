import { IUsersRepository } from "../users-repository";
import { CheckIn, Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "repositories/check-ins-repository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: data.id || randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
