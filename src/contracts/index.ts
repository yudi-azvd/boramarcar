import { DayTime, TimeBoxValue } from "@/types";

export interface UserTimeboxesRepository {
  update: (dayTime: DayTime, timeboxValue: TimeBoxValue) => Promise<void>
  getAll: () => Promise<{[key in DayTime]?: TimeBoxValue}>
}
