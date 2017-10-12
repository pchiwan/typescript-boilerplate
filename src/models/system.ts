import { ISystem, IPlanet } from './interfaces'
import Planet from './planet'

export default class System implements ISystem {
  name: string
  stellarMass: string
  stellarClass: string
  planets: IPlanet[]

  get nPlanets (): number {
    return this.planets.length
  }

  constructor (data: ISystem) {
    this.name = data.name
    this.stellarMass = data.stellarMass
    this.stellarClass = data.stellarClass
    this.planets = data.planets.map((planet: IPlanet) => new Planet(planet))
  }
}