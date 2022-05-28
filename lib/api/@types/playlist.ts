export interface ValueDTO {
  value: number
  display: string
}

export type ValidModes =
  | 'Competitive'
  | 'Deathmatch'
  | 'Escalation'
  | 'Replication'
  | 'Snowball Fight'
  | 'Spike Rush'
  | 'Unrated'

export interface PlaylistDTO {
  name: string
  timePlayed: ValueDTO
  matchesPlayed: ValueDTO
  matchesWon: ValueDTO
  matchesLost: ValueDTO
  winRate: ValueDTO
  kills: ValueDTO
  deaths: ValueDTO
  assists: ValueDTO
  headshots: ValueDTO
  headshotsPercentage: ValueDTO
  kdr: ValueDTO
  kda: ValueDTO
  kad: ValueDTO
  damage: ValueDTO
  plants: ValueDTO
  defuses: ValueDTO
  firstBloods: ValueDTO
  aces: ValueDTO
  currentRank: string
  peakRank: string
}
