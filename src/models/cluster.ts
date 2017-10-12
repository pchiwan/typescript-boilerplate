import { ICluster, ISystem } from './interfaces'
import System from './system'

export default class Cluster implements ICluster {
  name: string
  systems: ISystem[]

  get nSystems (): number {
    return this.systems.length
  }

  constructor (data: ICluster) {
    this.name = data.name
    this.systems = data.systems.map((system: ISystem) => new System(system))
  }
}