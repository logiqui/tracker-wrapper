import { Profile } from './valorant/profile'
import { Playlist } from './valorant/playlist'
import { Weapons } from './valorant/weapons'
import { Maps } from './valorant/maps'

export class TrackerAPI {
  public profile: Profile
  public playlist: Playlist
  public weapons: Weapons
  public maps: Maps

  constructor() {
    this.profile = new Profile()
    this.playlist = new Playlist()
    this.weapons = new Weapons()
    this.maps = new Maps()
  }
}
