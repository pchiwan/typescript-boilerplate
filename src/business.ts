import db from './db'
import { ICluster, ISystem, IPlanet } from './models/interfaces'

function getAllPlanets (): IPlanet[] {
  const planets: IPlanet[] = []
  db.forEach((cluster:ICluster) => {
    planets.push(...getAllClusterPlanets(cluster))
  })
  return planets
}

function getAllClusterPlanets (cluster: ICluster): IPlanet[] {
  const planets: IPlanet[] = []
  cluster.systems.forEach((system: ISystem) => planets.push(...system.planets))
  return planets
}

function findCluster (clusterName: string): ICluster {
  return db.find((c: ICluster) => c.name === clusterName)
}

function traverseGalaxy (planetName: string, i: number = 0): ICluster {
  if (i === db.length) return null
  const system = traverseCluster(planetName, db[i])
  if (system !== null) return {
    ...db[i],
    systems: [system]
  }
  return traverseGalaxy(planetName, ++i)
}

function traverseCluster (planetName: string, cluster: ICluster, i: number = 0): ISystem {
  if (i === cluster.nSystems) return null
  const planet = traverseSystem(planetName, cluster.systems[i])
  if (planet !== null) return {
    ...cluster.systems[i],
    planets: [planet]
  }
  return traverseCluster(planetName, cluster, ++i)
}

function traverseSystem (planetName: string, system: ISystem, i: number = 0): IPlanet {
  if (i === system.nPlanets) return null
  if (system.planets[i].name === planetName) return system.planets[i]
  return traverseSystem(planetName, system, ++i)
}

export function getClusterSummary (clusterName: string) {
  const cluster = findCluster(clusterName)
  return cluster.systems.map((system: ISystem) => ({
    name: system.name,
    stellarMass: system.stellarMass,
    stellarClass: system.stellarClass,
    planets: system.nPlanets
  }))
}

export function locatePlanet (planetName: string) {
  const cluster = traverseGalaxy(planetName)
  return cluster !== null
    ? `${cluster.name} -> ${cluster.systems[0].name} -> ${cluster.systems[0].planets[0].name}`
    : 'Planet not found!'
}

export function getGasGiants (): IPlanet[] {
  return getAllPlanets().filter((planet: IPlanet) => planet.isGasGiant())
}
