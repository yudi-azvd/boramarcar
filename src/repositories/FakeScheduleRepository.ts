import { GetAllScheduleDTO, ScheduleRepository, UpdateScheduleDTO } from "@/contracts";
import { DayTime, TimeboxValue } from "@/types";

export default class FakeScheduleRepository implements ScheduleRepository {
  constructor(private timeboxes: {
    [key in DayTime]?: TimeboxValue
  }) { }

  async update({ dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
    this.timeboxes[dayTime] = timeboxValue
  }

  async getAll({ userId }: GetAllScheduleDTO): Promise<{ [key in DayTime]?: TimeboxValue }> {
    return this.timeboxes
  }
}
