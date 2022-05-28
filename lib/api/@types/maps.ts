import { ValueDTO } from './playlist'

export type ValidMaps =
  | 'Ascent'
  | 'Bind'
  | 'Haven'
  | 'Split'
  | 'Icebox'
  | 'Breeze'
  | 'Fracture'

export interface MapsDTO {
  name: string
  timePlayed: ValueDTO
  matchesWon: ValueDTO
  matchesLost: ValueDTO
  winRate: ValueDTO
}
