import ScheduleTab from '@/presentation/components/ScheduleTab'
import { CurrentUserScheduleUpdateEmitter, GetCurrentUserSchedule } from '@/contracts'
import {
  Day, Schedule, Time, Timebox,
} from '@/domain/types'

import {
  act, render, waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import 'jest-styled-components'
import { scheduleColors } from '@/../tests/util/schedule'

class FakeCurrentUserScheduleUpdateEmitter implements CurrentUserScheduleUpdateEmitter {
  emit(timebox: Timebox): void { }
}

describe('ScheduleTab', () => {
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday']
  const times: Time[] = ['09h', '10h', '11h']
  const defaultSchedule: Schedule = {
    'Sunday-09h': 'available',
    'Wednesday-11h': 'busy',
  }

  let container: HTMLElement
  let timeboxes: Element[]
  let getUserScheduleInThisRoom: GetCurrentUserSchedule
  let emitCurrentUserUpdateSpy: jest.SpyInstance

  function makeSut(schedule?: Schedule) {
    const definitiveTimeboxesValues = schedule === undefined
      ? defaultSchedule
      : schedule
    getUserScheduleInThisRoom = jest.fn<Promise<Schedule>, []>()
      .mockReturnValue(Promise.resolve(definitiveTimeboxesValues))

    const currentUserScheduleUpdateEmitter = new FakeCurrentUserScheduleUpdateEmitter()
    emitCurrentUserUpdateSpy = jest.spyOn(currentUserScheduleUpdateEmitter, 'emit')

    container = render(
      <ScheduleTab
        days={days}
        times={times}
        getCurrentUserSchedule={getUserScheduleInThisRoom}
        currentUserScheduleUpdateEmitter={currentUserScheduleUpdateEmitter}
      />,
    ).container
    timeboxes = [...container.querySelectorAll('.timebox')]
  }

  function getTimebox(selector: string): HTMLDivElement {
    return container.querySelector(selector) as HTMLDivElement
  }

  beforeEach(async () => {
    await act(async () => makeSut())
  })

  it('should request for all timeboxes on render', async () => {
    expect(getUserScheduleInThisRoom).toHaveBeenCalled()
  })

  it('should initially display timeboxes with initial colors defined in defaultTimeboxesValues', async () => {
    // Achei que tirando await waitFor(...) faria esse teste falhar porque as
    // asserções não esperariam o useEffect do Schedule. Mas mesmo sem isso, o
    // teste passa também
    await waitFor(() => {
      const undefinedTimebox = getTimebox('#sch-Sunday-10h')
      expect(undefinedTimebox).toHaveStyleRule('background', scheduleColors.undefined)

      const availableTimebox = getTimebox('#sch-Sunday-09h')
      expect(availableTimebox).toHaveStyleRule('background', scheduleColors.available)

      const busyTimebox = getTimebox('#sch-Wednesday-11h')
      expect(busyTimebox).toHaveStyleRule('background', scheduleColors.busy)
    })
  })

  it('should display 1 hour timeboxes Sunday through Wednesday, from 09h to 11h', async () => {
    expect(timeboxes).toHaveLength(12)

    const presentDaysTimes = ['Sunday-09h', 'Sunday-11h', 'Wednesday-09h', 'Wednesday-11h']
    presentDaysTimes.forEach((dayTime) => {
      expect(getTimebox(`#sch-${dayTime}`)).toBeTruthy()
    })

    const absentDaysTimes = ['Sunday-12h', 'Wednesday-20h', 'Saturday-15h']
    absentDaysTimes.forEach((dayTime) => {
      expect(getTimebox(`#sch-${dayTime}`)).toBeFalsy()
    })
  })

  it('should update Timebox value from undefined color to available color on first click', async () => {
    const timeboxToClick = getTimebox('#sch-Sunday-11h')
    await userEvent.click(timeboxToClick)
    expect(timeboxToClick).toHaveStyleRule('background', scheduleColors.available)
  })

  it('should update Timebox value from available color to busy color on second click', async () => {
    const timeboxToClick = getTimebox('#sch-Sunday-11h')
    await userEvent.click(timeboxToClick)
    await userEvent.click(timeboxToClick)
    expect(timeboxToClick).toHaveStyleRule('background', scheduleColors.busy)
  })

  it('should update Timebox value from busy color to undefined color on third click', async () => {
    const timeboxToClick = getTimebox('#sch-Sunday-11h')
    await userEvent.click(timeboxToClick)
    await userEvent.click(timeboxToClick)
    await userEvent.click(timeboxToClick)
    expect(timeboxToClick).toHaveStyleRule('background', scheduleColors.undefined)
  })

  it('should request to update for the Timebox', async () => {
    const timeboxToClick = getTimebox('#sch-Wednesday-09h')
    await userEvent.click(timeboxToClick)

    expect(emitCurrentUserUpdateSpy)
      .toHaveBeenCalledWith({ dayAndTime: 'Wednesday-09h', availability: 'available' })
  })
})
