import { ScheduleRepository, UpdateScheduleDTO } from "@/contracts";
import { DayTime, TimeBoxValue } from "@/types";

export default class FakeScheduleRepository implements ScheduleRepository {
  constructor(private timeboxes: {
    [key in DayTime]?: TimeBoxValue
  }) { }

  async update({ dayTime, timeboxValue }: UpdateScheduleDTO): Promise<void> {
    this.timeboxes[dayTime] = timeboxValue
  }

  async getAll(userId: string): Promise<{ [key in DayTime]?: TimeBoxValue }> {
    return this.timeboxes
  }
}
