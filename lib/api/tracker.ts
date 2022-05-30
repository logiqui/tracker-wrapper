import { Profile } from './valorant/profile'
import { Playlist } from './valorant/playlist'
import { Weapons } from './valorant/weapons'
import { Maps } from './valorant/maps'
import { Agents } from './valorant/agents'
import { Matches } from './valorant/matches'

export class TrackerAPI {
  public profile: Profile
  public playlist: Playlist
  public weapons: Weapons
  public maps: Maps
  public agents: Agents
  public matches: Matches

  constructor() {
    this.profile = new Profile()
    this.playlist = new Playlist()
    this.weapons = new Weapons()
    this.maps = new Maps()
    this.agents = new Agents()
    this.matches = new Matches()
  }
}
