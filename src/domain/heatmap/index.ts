// Habilite a extensão Color Highlight pra ver as cores
export const colorStops = {
  available: [
    '#D7FFED',
    '#ADFDDB',
    '#46F8B6',
    '#18DC86',
  ],
  busy: [
    '#FFDBDC',
    '#FAA6A9',
    '#FF777B',
    '#E95F63',
  ]
}

/**
 * Diferença entre usuários disponíveis e ocupados, necessariamente
 * nessa ordem. Se existem mais usuários disponíveis, `difference`
 * deve ser positivo. Se existem mais usuários disponíveis, `difference`
 * deve ser negativo.
 */
export function differenceToColor(available: number, busy: number, total: number) {
  if (available === 0 && busy === 0)
    return '#FFFFFF'
    
  const difference = available - busy
  if (difference === 0)
    return '#DDDDDD'
  if (difference > 0) {
    const availablePercent = difference / total
    return colorStops.available[Math.floor(availablePercent * 4) - 1]
  }
  const busyPercent = -difference / total
  return colorStops.busy[Math.floor(busyPercent * 4) - 1]
}

