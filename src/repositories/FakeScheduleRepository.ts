import { GetUserScheduleDTO, ScheduleRepository, UpdateScheduleDTO } from "@/contracts";
import { DayAndTime, Schedule, Availability } from "@/types";

export default class FakeScheduleRepository implements ScheduleRepository {
  rooms: {
    [key: string]: { // roomId
      [key: string]: { // userId
        [key in DayAndTime]?: Availability
      }
    }
  }

  constructor(private timeboxes: {
    [key in DayAndTime]?: Availability
  }) {
    this.rooms = {}
  }

  async update({ roomId, userId, dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
    // this.rooms[roomId][userId][dayTime] = timeboxValue
    this.timeboxes[dayTime] = timeboxValue
  }

  async updateBy({ dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
  }

  async getAll({ userId }: GetUserScheduleDTO): Promise<Schedule> {
    return this.timeboxes
  }
}
