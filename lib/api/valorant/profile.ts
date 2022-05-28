import { BaseApi } from '../base'
import { ProfileDTO } from '../@types/profile'

export class Profile extends BaseApi {
  async getRaw(username: string) {
    const [user, tag] = username.split('#')

    const response = await this.request(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${user}%23${tag}s`
    )

    return response['data']
  }

  async getUser(username: string): Promise<ProfileDTO> {
    const data = await this.getRaw(username)

    return {
      uuid: data['platformInfo']['platformUserId'],
      name: data['platformInfo']['platformUserHandle'],
      avatar: data['platformInfo']['avatarUrl']
    }
  }
}
