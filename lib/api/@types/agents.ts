import { ValueDTO } from './playlist'

export type ValidAgents =
  | 'Astra'
  | 'Breach'
  | 'Brimstone'
  | 'Cypher'
  | 'Jett'
  | 'Killjoy'
  | 'Omen'
  | 'Phoenix'
  | 'Raze'
  | 'Reyna'
  | 'Sage'
  | 'Skye'
  | 'Sova'
  | 'Viper'
  | 'Yoru'
  | 'KAY/O'
  | 'Chamber'
  | 'Neon'

export interface AgentDTO {
  name: string
  timePlayed: ValueDTO
  kills: ValueDTO
  deaths: ValueDTO
  assists: ValueDTO
  kdr: ValueDTO
  damage: ValueDTO
  winRate: ValueDTO
}
