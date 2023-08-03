import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>;
}