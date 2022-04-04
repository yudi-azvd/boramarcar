import DayTime from '@/data/DayTime'

type HeatmapData = {
  [key in DayTime]?: {
    available: number,
    busy: number,
    undefined: number
  }
}

export default HeatmapData