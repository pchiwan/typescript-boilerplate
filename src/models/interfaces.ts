interface ICelestialBody {
  name: string
}

export interface ICluster extends ICelestialBody {
  systems: ISystem[]

  readonly nSystems? : number
}

export interface ISystem extends ICelestialBody {
  stellarMass: string
  stellarClass: string
  planets: IPlanet[]

  readonly nPlanets? : number
}

export interface IPlanet extends ICelestialBody {
  name: string
  dayLength: string
  orbitalPeriod: string
  temp: string
  radius: string

  isGasGiant? () : boolean
}