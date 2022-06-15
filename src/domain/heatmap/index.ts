import { timeboxColors } from '@/domain/schedule/colors'

// Habilite a extensão Color Highlight pra ver as cores
export const colorStops = {
  available: [
    '#D7FFED',
    '#ADFDDB',
    '#46F8B6',
    // '#18DC86',
    timeboxColors.available,
  ],
  busy: [
    '#FFDBDC',
    '#FAA6A9',
    '#FF777B',
    // '#E95F63',
    timeboxColors.busy,
  ],
}

/**
 * Diferença entre usuários disponíveis e ocupados, necessariamente
 * nessa ordem. Se existem mais usuários disponíveis, `difference`
 * deve ser positivo. Se existem mais usuários disponíveis, `difference`
 * deve ser negativo.
 */
export function differenceToColor(available: number, busy: number, total: number) {
  if (available === 0 && busy === 0) return '#FFFFFF'

  const difference = available - busy
  let stopIndex = 0
  if (difference === 0) return '#DDDDDD'
  if (difference > 0) {
    const availablePercentage = difference / total
    const { length } = colorStops.available
    stopIndex = Math.floor(availablePercentage * length)
    stopIndex = stopIndex === length ? stopIndex - 1 : stopIndex
    return colorStops.available[stopIndex]
  }

  const busyPercentage = -difference / total
  const { length } = colorStops.busy
  stopIndex = Math.floor(busyPercentage * length)
  stopIndex = stopIndex === length ? stopIndex - 1 : stopIndex
  return colorStops.busy[stopIndex]
}
