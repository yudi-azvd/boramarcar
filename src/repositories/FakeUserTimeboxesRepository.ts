import { UserTimeboxesRepository } from "@/contracts";
import { DayTime, TimeBoxValue } from "@/types";

export default class FakeUserTimeboxesRepository implements UserTimeboxesRepository {
  constructor(readonly userId: string, private timeboxes: {
    [key in DayTime]?: TimeBoxValue
  }) { }

  async update(dayTime: DayTime, timeboxValue: TimeBoxValue): Promise<void> {
    this.timeboxes[dayTime] = timeboxValue
  }

  async getAll(): Promise<{ [key in DayTime]?: TimeBoxValue }> {
    return this.timeboxes
  }
}
