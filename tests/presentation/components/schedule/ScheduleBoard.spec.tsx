import ScheduleBoard from "@/presentation/components/ScheduleBoard"
import FakeScheduleRepository from "@/repositories/FakeScheduleRepository"
import { GetUserScheduleDTO, GetCurrentUserSchedule, UpdateScheduleDTO, UpdateCurrentUserSchedule } from "@/contracts"
import { Day, DayTime, Schedule, Time, TimeboxValue } from "@/types"

import { act, fireEvent, render, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'

import 'jest-styled-components'

describe('Schedule', () => {
  const days: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday']
  const times: Time[] = ['09h', '10h', '11h']
  const defaultTimeboxesValues: Schedule = {
    'Sunday-09h': 'available',
    'Wednesday-11h': 'busy'
  }

  let userId = 'fake-user-id'
  let roomId = 'fake-room-id'
  let fakeScheduleRepository: FakeScheduleRepository
  let container: HTMLElement
  let timeboxes: Element[]
  let getUserScheduleInThisRoom: GetCurrentUserSchedule
  let updateUserScheduleInThisRoom: UpdateCurrentUserSchedule

  function makeSut(timeboxesValues?: Schedule) {
    const definitiveTimeboxesValues = timeboxesValues === undefined
      ? defaultTimeboxesValues
      : timeboxesValues
    fakeScheduleRepository = new FakeScheduleRepository(definitiveTimeboxesValues)
    getUserScheduleInThisRoom = jest.fn<Promise<Schedule>, []>()
      .mockReturnValue(Promise.resolve(definitiveTimeboxesValues))

    updateUserScheduleInThisRoom = jest.fn<Promise<void>, [[DayTime, TimeboxValue]]>()

    container = render(
      <ScheduleBoard
        days={days}
        times={times}
        getCurrentUserSchedule={getUserScheduleInThisRoom}
        updateCurrentUserSchedule={updateUserScheduleInThisRoom}
      />).container
    timeboxes = [...container.querySelectorAll('.timebox')]
  }

  async function actClick(element: Window | Element | Node, options?: {} | undefined): Promise<void> {
    await act(async () => {
      fireEvent.click(element)
    })
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
      const undefinedTimebox = container.querySelector('#sch-Sunday-10h') as HTMLDivElement
      expect(undefinedTimebox).toHaveStyleRule('background', '#FFFFFF')

      const availableTimebox = container.querySelector('#sch-Sunday-09h') as HTMLDivElement
      expect(availableTimebox).toHaveStyleRule('background', '#18DC86')

      const busyTimebox = container.querySelector('#sch-Wednesday-11h') as HTMLDivElement
      expect(busyTimebox).toHaveStyleRule('background', '#E95F63')
    })

    // timeboxes.forEach(t => {
    //   expect(t).toMatchSnapshot()
    //   expect(t).toHaveStyleRule('background', '#FFFFFF')
    // })
  })

  it('should display 1 hour timeboxes Sunday through Wednesday, from 09h to 11h', async () => {
    expect(timeboxes).toHaveLength(12)

    const presentDaysTimes = ['Sunday-09h', 'Sunday-11h', 'Wednesday-09h', 'Wednesday-11h']
    presentDaysTimes.forEach(dayTime => {
      expect(container.querySelector(`#sch-${dayTime}`)).toBeTruthy()
    })

    const absentDaysTimes = ['Sunday-12h', 'Wednesday-20h', 'Saturday-15h']
    absentDaysTimes.forEach(dayTime => {
      expect(container.querySelector(`#sch-${dayTime}`)).toBeFalsy()
    })
  })

  it('should update Timebox value from undefined color to available color on first click', async () => {
    await waitFor(async () => {
      const timeboxToClick = container.querySelector('#sch-Sunday-11h') as HTMLDivElement
      await actClick(timeboxToClick)
      expect(timeboxToClick).toHaveStyleRule('background', '#18DC86')
    })
  })

  it('should update Timebox value from available color to busy color on second click', async () => {
    await waitFor(async () => {
      let timeboxToClick = container.querySelector('#sch-Sunday-11h') as HTMLDivElement
      await actClick(timeboxToClick)
      await actClick(timeboxToClick)
      expect(timeboxToClick).toHaveStyleRule('background', '#E95F63')
    })
  })

  it('should update Timebox value from busy color to undefined color on third click', async () => {
    await waitFor(async () => {
      const timeboxToClick = container.querySelector('#sch-Sunday-11h') as HTMLDivElement
      await actClick(timeboxToClick)
      // expect(timeboxToClick).toHaveStyleRule('background', '#18DC86')
      await actClick(timeboxToClick)
      // Essa asserção é desnecessária, mas se não tiver, a asserção para
      // #FFFFFF falha. Vai saber...
      expect(timeboxToClick).toHaveStyleRule('background', '#E95F63')
      await actClick(timeboxToClick)
      expect(timeboxToClick).toHaveStyleRule('background', '#FFFFFF')
    })
  })

  it('should request to update for the Timebox', async () => {
    await waitFor(async () => {
      const timeboxToClick = container.querySelector('#sch-Wednesday-09h') as HTMLDivElement
      await actClick(timeboxToClick)

      expect(updateUserScheduleInThisRoom)
        .toHaveBeenCalledWith(['Wednesday-09h', 'available' ])
    })
  })
})
