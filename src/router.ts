import * as express from 'express'

import { HTTP_OK} from './config'
import {
  getClusterSummary,
  getGasGiants,
  locatePlanet
} from './business'

const router = express.Router()

router.get('/', ((req, res) => {
  res.status(HTTP_OK)
  res.send('To infinity and beyond!')
}))

router.get('/clusters/:clusterName/systems', (req, res) => {
  res.status(HTTP_OK)
  res.send(getClusterSummary(req.params.clusterName))
})

router.get('/locate/:planetName', ((req, res) => {
  res.status(HTTP_OK)
  res.send(locatePlanet(req.params.planetName))
}))

router.get('/gasgiants', ((req, res) => {
  res.status(HTTP_OK)
  res.send(getGasGiants())
}))

export default router