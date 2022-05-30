import { MatchInfoDTO, PlayerDTO } from '../@types/matches'
import { BaseApi } from '../base'

export class Matches extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/matches/riot/${user}%23${tag}?type=competitive`
    )

    return response['data']['matches'][0]
  }

  async getLastMatch(username: string): Promise<MatchInfoDTO> {
    const lastMatch = await this.getRaw(username)
    const lastData = lastMatch['segments'][0]
    const lastStats = lastData['stats']

    const lastMatchInfo = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/matches/${lastMatch['attributes']['id']}`
    )

    const matchInfo: MatchInfoDTO = {
      mapName: lastMatch['metadata']['mapName'],
      modeName: lastMatch['metadata']['modeName'],
      timestamp: lastMatch['metadata']['timestamp'],
      allPlayers: [],
      teams: [],
      result: lastData['metadata']['result'],
      roundsWon: lastStats['roundsWon']['value'],
      roundsLost: lastStats['roundsLost']['value'],
      playTime: {
        display: lastStats['playtime']['displayValue'],
        value: lastStats['playtime']['value']
      }
    }

    lastMatchInfo['data']['segments'].forEach((segment: any) => {
      // Get all players info
      if (segment['type'] === 'player-summary') {
        const playerStats = segment['stats']

        matchInfo.allPlayers.push({
          name: segment['attributes']['platformUserIdentifier'],
          team: segment['metadata']['teamId'],
          agent: segment['metadata']['agentName'],
          rank: playerStats['rank']['displayValue'],
          kills: {
            display: playerStats['kills']['displayValue'],
            value: playerStats['kills']['value']
          },
          deaths: {
            display: playerStats['deaths']['displayValue'],
            value: playerStats['deaths']['value']
          },
          assists: {
            display: playerStats['assists']['displayValue'],
            value: playerStats['assists']['value']
          },
          kdr: {
            display: playerStats['kdRatio']['displayValue'],
            value: playerStats['kdRatio']['value']
          },
          acs: {
            display: playerStats['scorePerRound']['displayValue'],
            value: playerStats['scorePerRound']['value']
          }
        })
      }

      // Get teams info
      if (segment['type'] === 'team-summary') {
        matchInfo.teams.push({
          name: segment['metadata']['name'],
          players: []
        })
      }
    })

    // Build players team
    matchInfo['allPlayers'].forEach((player) => {
      player['team'] === 'Red'
        ? matchInfo['teams'][0]['players'].push(player)
        : matchInfo['teams'][1]['players'].push(player)
    })

    // Sort players by ACS
    matchInfo['teams'].forEach((team) => {
      team['players'].sort((a: PlayerDTO, b: PlayerDTO) => {
        return b['acs']['value'] - a['acs']['value']
      })
    })

    return matchInfo
  }
}
