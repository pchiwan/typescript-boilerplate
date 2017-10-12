import { IPlanet } from './interfaces'

export default class Planet implements IPlanet {
  name: string
  dayLength: string
  orbitalPeriod: string
  temp: string
  radius: string

  constructor (data: IPlanet) {
    this.name = data.name
    this.dayLength = data.dayLength
    this.orbitalPeriod = data.orbitalPeriod
    this.temp = data.temp
    this.radius = data.radius
  }

  isGasGiant (): boolean {
    return this.temp === 'N/A'
  }
}