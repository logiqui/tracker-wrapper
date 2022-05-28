import { BaseApi } from '../base'
import { PlaylistDTO, ValidModes } from '../@types/playlist'

export class Playlist extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${user}%23${tag}`
    )

    return response['data']['segments']
  }

  async getPlaylists(username: string): Promise<PlaylistDTO[]> {
    const data = await this.getRaw(username)
    const playlists: PlaylistDTO[] = []

    data.find((segment: any) => {
      if (segment.type === 'playlist') {
        playlists.push({
          name: segment['metadata']['name'],
          timePlayed: {
            display: segment['stats']['timePlayed']['displayValue'],
            value: segment['stats']['timePlayed']['value']
          },
          matchesPlayed: {
            display: segment['stats']['matchesPlayed']['displayValue'],
            value: segment['stats']['matchesPlayed']['value']
          },
          matchesWon: {
            display: segment['stats']['matchesWon']['displayValue'],
            value: segment['stats']['matchesWon']['value']
          },
          matchesLost: {
            display: segment['stats']['matchesLost']['displayValue'],
            value: segment['stats']['matchesLost']['value']
          },
          winRate: {
            display: segment['stats']['matchesWinPct']['displayValue'],
            value: segment['stats']['matchesWinPct']['value']
          },
          kills: {
            display: segment['stats']['kills']['displayValue'],
            value: segment['stats']['kills']['value']
          },
          deaths: {
            display: segment['stats']['deaths']['displayValue'],
            value: segment['stats']['deaths']['value']
          },
          assists: {
            display: segment['stats']['assists']['displayValue'],
            value: segment['stats']['assists']['value']
          },
          headshots: {
            display: segment['stats']['headshots']['displayValue'],
            value: segment['stats']['headshots']['value']
          },
          headshotsPercentage: {
            display: segment['stats']['headshotsPercentage']['displayValue'],
            value: segment['stats']['headshotsPercentage']['value']
          },
          kdr: {
            display: segment['stats']['kDRatio']['displayValue'],
            value: segment['stats']['kDRatio']['value']
          },
          kda: {
            display: segment['stats']['kDARatio']['displayValue'],
            value: segment['stats']['kDARatio']['value']
          },
          kad: {
            display: segment['stats']['kADRatio']['displayValue'],
            value: segment['stats']['kADRatio']['value']
          },
          damage: {
            display: segment['stats']['damage']['displayValue'],
            value: segment['stats']['damage']['value']
          },
          plants: {
            display: segment['stats']['plants']['displayValue'],
            value: segment['stats']['plants']['value']
          },
          defuses: {
            display: segment['stats']['defuses']['displayValue'],
            value: segment['stats']['defuses']['value']
          },
          firstBloods: {
            display: segment['stats']['firstBloods']['displayValue'],
            value: segment['stats']['firstBloods']['value']
          },
          aces: {
            display: segment['stats']['aces']['displayValue'],
            value: segment['stats']['aces']['value']
          },
          mostKills: {
            display: segment['stats']['mostKillsInMatch']['displayValue'],
            value: segment['stats']['mostKillsInMatch']['value']
          },
          killsPerMatch: {
            display: segment['stats']['killsPerMatch']['displayValue'],
            value: segment['stats']['killsPerMatch']['value']
          },
          deathsPerMatch: {
            display: segment['stats']['deathsPerMatch']['displayValue'],
            value: segment['stats']['deathsPerMatch']['value']
          },
          assistsPerMatch: {
            display: segment['stats']['assistsPerMatch']['displayValue'],
            value: segment['stats']['assistsPerMatch']['value']
          },
          damagePerRound: {
            display: segment['stats']['damagePerRound']['displayValue'],
            value: segment['stats']['damagePerRound']['value']
          },
          scorePerRound: {
            display: segment['stats']['scorePerRound']['displayValue'],
            value: segment['stats']['scorePerRound']['value']
          },
          econRatingPerMatch: {
            display: segment['stats']['econRatingPerMatch']['displayValue'],
            value: segment['stats']['econRatingPerMatch']['value']
          },
          deathsFirst: {
            display: segment['stats']['deathsFirst']['displayValue'],
            value: segment['stats']['deathsFirst']['value']
          },
          tierName: `${
            segment.attributes!.key === 'competitive'
              ? segment['stats']['rank']['metadata']['tierName']
              : 'Unrated'
          }`,
          currentRank: {
            display: `${
              segment.attributes!.key === 'competitive'
                ? `${segment['stats']['rank']['metadata']['tierName']} - ${segment['stats']['rank']['value']}RR`
                : 'Unrated'
            }`,
            icon: `${
              segment.attributes!.key === 'competitive'
                ? segment['stats']['rank']['metadata']['iconUrl']
                : 'https://cdn.discordapp.com/attachments/834195818080108564/835593595851112518/unranked.png'
            }`
          },
          peakRank: {
            display: `${
              segment.attributes!.key === 'competitive'
                ? `${segment['stats']['peakRank']['metadata']['tierName']} - ${segment['stats']['peakRank']['value']}RR`
                : 'Unrated'
            }`,
            icon: `${
              segment.attributes!.key === 'competitive'
                ? segment['stats']['peakRank']['metadata']['iconUrl']
                : 'https://cdn.discordapp.com/attachments/834195818080108564/835593595851112518/unranked.png'
            }`,
            actName: `${
              segment.attributes!.key === 'competitive'
                ? segment['stats']['peakRank']['metadata']['actName']
                : 'Unrated'
            }`
          }
        })
      }
    })

    return playlists
  }

  async getPlaylist(
    username: string,
    gamemode: ValidModes
  ): Promise<PlaylistDTO> {
    const data = await this.getPlaylists(username)

    const playlistData = data.find((x: any) => x.name === gamemode)

    return playlistData!
  }

  async getTimePlayed(username: string): Promise<string> {
    const data = await this.getPlaylists(username)

    let timePlayedValue = 0

    data.forEach((playlist: PlaylistDTO) => {
      timePlayedValue += playlist.timePlayed.value
    })

    const playTimeHours = Math.floor(timePlayedValue / (1000 * 60 * 60))
    const playTimeMinutes =
      Math.floor(timePlayedValue / (1000 * 60)) - playTimeHours * 60
    const totalPlayTime = playTimeHours + 'h ' + playTimeMinutes + 'm'

    return totalPlayTime
  }
}
