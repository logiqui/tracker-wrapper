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

export interface RankDTO {
  display: string
  icon: string
}

export interface PeakDTO extends RankDTO {
  actName: string
}

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
  mostKills: ValueDTO
  killsPerMatch: ValueDTO
  deathsPerMatch: ValueDTO
  assistsPerMatch: ValueDTO
  damagePerRound: ValueDTO
  scorePerRound: ValueDTO
  econRatingPerMatch: ValueDTO
  deathsFirst: ValueDTO
  tierName: string
  currentRank: RankDTO
  peakRank: PeakDTO
}
