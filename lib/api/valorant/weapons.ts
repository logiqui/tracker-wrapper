import { BaseApi } from '../base'
import { ValidWeapons, WeaponDTO } from '../@types/weapons'

export class Weapons extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${user}%23${tag}/segments/weapon`
    )

    return response['data']
  }

  async getWeapons(username: string): Promise<WeaponDTO[]> {
    const data = await this.getRaw(username)
    const weapons: WeaponDTO[] = []

    data.forEach((weapon: any) => {
      weapons.push({
        name: weapon['metadata']['name'],
        kills: {
          display: weapon['stats']['kills']['displayValue'],
          value: weapon['stats']['kills']['value']
        },
        deathsBy: {
          display: weapon['stats']['deaths']['displayValue'],
          value: weapon['stats']['deaths']['value']
        },
        headshot: {
          display: weapon['stats']['headshotsPercentage']['displayValue'],
          value: weapon['stats']['headshotsPercentage']['value']
        },
        damagePerRound: {
          display: weapon['stats']['damagePerRound']['displayValue'],
          value: weapon['stats']['damagePerRound']['value']
        },
        firstBloods: {
          display: weapon['stats']['firstBloods']['displayValue'],
          value: weapon['stats']['firstBloods']['value']
        },
        longestKill: {
          display: weapon['stats']['longestKillDistance']['displayValue'],
          value: weapon['stats']['longestKillDistance']['value']
        }
      })
    })

    return weapons
  }

  async getWeapon(username: string, weapon: ValidWeapons): Promise<WeaponDTO> {
    const data = await this.getWeapons(username)

    const weaponData = data.find((x: any) => x.name === weapon)

    return weaponData!
  }

  async getTopWeapons(username: string): Promise<WeaponDTO[]> {
    const weapons = await this.getWeapons(username)

    weapons.sort((a: WeaponDTO, b: WeaponDTO) => {
      return b['kills']['value'] - a['kills']['value']
    })

    weapons.splice(5)

    return weapons
  }
}
