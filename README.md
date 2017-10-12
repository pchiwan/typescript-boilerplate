# Typescript Boilerplate
Boilerplate for a Typescript project

## Exercise

Implement an Express API with the following endpoints:

### `/api/clusters/{clusterName}/systems`
Given a cluster name, returns a list with summarized info on its systems, i.e.
```javascript
interface System {
  name: string
  stellarMass: string
  stellarClass: string
  planets: number
}
```

### `/api/locate/{planetName}`
Given a planet name, return the full path to it in the galaxy, i.e. `Cluster -> System -> Planet`. Tip:
```javascript
interface Cluster {
  name: string
  systems: System[]
  ...
}

interface System {
  name: string
  planets: Planet[]
  ...
}
```

### `/api/gasgiants`
Get a list of all the gas giants in the galaxy. Gas giants have no surface temperature, so their `temp` is set to `N/A`.

### Some rules
Use the following interfaces:
```javascript
interface CelestialBody {
  name: string
}

interface Planet {
  name: string
  dayLength: string
  orbitalPeriod: string
  temp: string
  radius: string

  isGasGiant (): boolean
}
```