import { TrackerAPI } from './api/tracker'

export * from './api/tracker'
export * from './api/valorant/maps'
export * from './api/valorant/playlist'
export * from './api/valorant/profile'
export * from './api/valorant/weapons'

export * from './api/@types/maps'
export * from './api/@types/playlist'
export * from './api/@types/profile'
export * from './api/@types/weapons'

const main = async () => {
  const api = new TrackerAPI()

  const teste = await api.agents.getAgent(`logic ma fase#1244`, 'Breach')

  console.log(teste)
}

main()
