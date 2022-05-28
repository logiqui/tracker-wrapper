import { ValueDTO } from './playlist'

export type ValidWeapons =
  | 'Ghost'
  | 'Classic'
  | 'Melee'
  | 'Shorty'
  | 'Frenzy'
  | 'Spectre'
  | 'Guardian'
  | 'Ares'
  | 'Odin'
  | 'Bucky'
  | 'Vandal'
  | 'Operator'
  | 'Bulldog'
  | 'Marshal'
  | 'Sheriff'
  | 'Judge'
  | 'Phantom'
  | 'Stinger'

export interface WeaponDTO {
  name: string
  kills: ValueDTO
  deathsBy: ValueDTO
  headshot: ValueDTO
  damagePerRound: ValueDTO
  firstBloods: ValueDTO
  longestKill: ValueDTO
}
