import { ValidAgents } from './agents'
import { ValueDTO } from './playlist'

export interface PlayerDTO {
  name: string
  kills: ValueDTO
  deaths: ValueDTO
  assists: ValueDTO
  kdr: ValueDTO
  acs: ValueDTO
  headshots?: ValueDTO
  firtBloods?: ValueDTO
  team: string
  agent: string
  rank: string
}

export interface Team {
  name: string
  players: PlayerDTO[]
}

export interface MatchInfoDTO {
  mapName: string
  modeName: string
  playTime: ValueDTO
  allPlayers: PlayerDTO[]
  teams: Team[]
  result: string
  timestamp: number
  roundsWon: number
  roundsLost: number
}
