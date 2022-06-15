import { colorStops, differenceToColor } from '@/domain/heatmap'

interface SutParams {
  available?: number
  busy?: number
}

describe('differenceToColor', () => {
  let available = 0
  let busy = 0
  let total = 0

  function makeSut(params?: SutParams) {
    available = params?.available || 0
    busy = params?.busy || 0
    total = available + busy
  }

  it('should return grey color for 10 users, 5 available, 5 busy in a timebox', () => {
    makeSut({ available: 5, busy: 5 })

    const color = differenceToColor(available, busy, total)

    expect(color).toEqual('#DDDDDD')
  })

  it('should return available stop 3 color for 10 users, 9 available, 1 busy in a timebox', () => {
    makeSut({ available: 9, busy: 1 })

    const color = differenceToColor(available, busy, total)

    expect(color).toEqual(colorStops.available[3])
  })

  it('should return available stop 2 for 10 users, 8 available, 2 busy in a timebox', () => {
    makeSut({ available: 8, busy: 2 })

    const color = differenceToColor(available, busy, total)

    expect(color).toEqual(colorStops.available[2])
  })

  it('should return available stop 0 for 10 users, 6 available, 4 busy in a timebox', () => {
    makeSut({ available: 6, busy: 4 })

    const color = differenceToColor(available, busy, total)

    expect(color).toEqual(colorStops.available[0])
  })

  it('should return busy stop 3 color for 10 users, 1 available, 9 busy in a timebox', () => {
    makeSut({ available: 1, busy: 9 })

    const color = differenceToColor(available, busy, total)

    expect(color).toEqual(colorStops.busy[3])
  })
})
