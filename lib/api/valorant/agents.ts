import { BaseApi } from '../base'
import { AgentDTO, ValidAgents } from '../@types/agents'

export class Agents extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${user}%23${tag}`
    )

    return response['data']['segments']
  }

  async getAgents(username: string): Promise<AgentDTO[]> {
    const data = await this.getRaw(username)
    const agents: AgentDTO[] = []

    data.forEach((segment: any) => {
      if (segment.type === 'agent') {
        agents.push({
          name: segment['metadata']['name'],
          timePlayed: {
            display: segment['stats']['timePlayed']['displayValue'],
            value: segment['stats']['timePlayed']['value']
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
          kdr: {
            display: segment['stats']['kDRatio']['displayValue'],
            value: segment['stats']['kDRatio']['value']
          },
          damage: {
            display: segment['stats']['damagePerRound']['displayValue'],
            value: segment['stats']['damagePerRound']['value']
          },
          winRate: {
            display: segment['stats']['matchesWinPct']['displayValue'],
            value: segment['stats']['matchesWinPct']['value']
          }
        })
      }
    })

    return agents
  }

  async getAgent(username: string, agent: ValidAgents): Promise<AgentDTO> {
    const data = await this.getAgents(username)

    const agentData = data.find((x: any) => x.name === agent)

    return agentData!
  }

  async getTopAgents(username: string): Promise<AgentDTO[]> {
    const agents = await this.getAgents(username)

    agents.sort((a: AgentDTO, b: AgentDTO) => {
      return b['timePlayed']['value'] - a['timePlayed']['value']
    })

    agents.splice(5)

    return agents
  }
}
