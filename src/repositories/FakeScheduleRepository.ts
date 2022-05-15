import { GetUserScheduleDTO, ScheduleRepository, UpdateScheduleDTO } from "@/contracts";
import { DayTime, Schedule, TimeboxValue } from "@/types";

export default class FakeScheduleRepository implements ScheduleRepository {
  constructor(private timeboxes: {
    [key in DayTime]?: TimeboxValue
  }) { }

  async update({ dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
    this.timeboxes[dayTime] = timeboxValue
  }

  async getAll({ userId }: GetUserScheduleDTO): Promise<Schedule> {
    return this.timeboxes
  }
}
