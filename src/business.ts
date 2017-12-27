import db from './db'
import { ICluster, ISystem, IPlanet } from './models/interfaces'

function getAllPlanets (): IPlanet[] {
  return db.reduce((value: IPlanet[], cluster: ICluster) => [...value, ...getAllClusterPlanets(cluster)], [])
}

function getAllClusterPlanets (cluster: ICluster): IPlanet[] {
  return cluster.systems.reduce((value: IPlanet[], system: ISystem) => [...value, ...system.planets], [])
}

function findCluster (clusterName: string): ICluster {
  return db.find((cluster: ICluster) => cluster.name === clusterName)
}

function traverseGalaxy (planetName: string, i: number = 0): ICluster {
  if (i === db.length) return null
  const system = traverseCluster(planetName, db[i])
  return system !== null
    ? { ...db[i], systems: [system] }
    : traverseGalaxy(planetName, ++i)
}

function traverseCluster (planetName: string, cluster: ICluster, i: number = 0): ISystem {
  if (i === cluster.nSystems) return null
  const planet = traverseSystem(planetName, cluster.systems[i])
  return planet !== null
    ? { ...cluster.systems[i], planets: [planet] }
    : traverseCluster(planetName, cluster, ++i)
}

function traverseSystem (planetName: string, system: ISystem, i: number = 0): IPlanet {
  if (i === system.nPlanets) return null
  return system.planets[i].name === planetName
    ? system.planets[i]
    : traverseSystem(planetName, system, ++i)
}

function flattenGalaxy<T> (iteratorFn: (cluster: ICluster) => T[]) : T[] {
  return db.reduce((value: T[], cluster: ICluster) => [...value, ...iteratorFn(cluster)], [])
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
