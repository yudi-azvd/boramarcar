import { GetUserScheduleDTO, ScheduleRepository, UpdateScheduleDTO } from "@/contracts";
import { DayTime, TimeboxValue } from "@/types";

export default class FakeScheduleRepository implements ScheduleRepository {
  rooms: {
    [key: string]: { // roomId
      [key: string]: { // userId
        [key in DayTime]?: TimeboxValue
      }
    }
  }

  constructor(private timeboxes: {
    [key in DayTime]?: TimeboxValue
  }) {
    this.rooms = {}
  }

  async update({ roomId, userId, dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
    // this.rooms[roomId][userId][dayTime] = timeboxValue
    this.timeboxes[dayTime] = timeboxValue
  }

  async updateBy({ dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
  }

  async getAll({ userId }: GetUserScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }> {
    return this.timeboxes
  }
}
