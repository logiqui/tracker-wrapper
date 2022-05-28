import { BaseApi } from '../base'
import { MapsDTO, ValidMaps } from '../@types/maps'

export class Maps extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${user}%23${tag}/segments/map`
    )

    return response['data']
  }

  async getMaps(username: string): Promise<MapsDTO[]> {
    const data = await this.getRaw(username)
    const maps: MapsDTO[] = []

    for (let i = 0; i < data.length; i++) {
      if (i != 4) {
        maps.push({
          name: data[i]['metadata']['name'],
          timePlayed: {
            display: data[i]['stats']['timePlayed']['displayValue'],
            value: data[i]['stats']['timePlayed']['value']
          },
          matchesWon: {
            display: data[i]['stats']['matchesWon']['displayValue'],
            value: data[i]['stats']['matchesWon']['value']
          },
          matchesLost: {
            display: data[i]['stats']['matchesLost']['displayValue'],
            value: data[i]['stats']['matchesLost']['value']
          },
          winRate: {
            display: data[i]['stats']['matchesWinPct']['displayValue'],
            value: data[i]['stats']['matchesWinPct']['value']
          }
        })
      }
    }

    return maps
  }

  async getMap(username: string, map: ValidMaps): Promise<MapsDTO> {
    const data = await this.getMaps(username)

    const mapData = data.find((x: any) => x.name === map)

    return mapData!
  }
}
