import * as fs from 'fs'
import { JSON_FILE_PATH } from './config'
import { ICluster } from './models/interfaces'
import Cluster from './models/cluster'

const rawdata = fs.readFileSync(JSON_FILE_PATH, 'utf8')
const json = JSON.parse(rawdata)
const db: ICluster[] = json.map((cluster: ICluster) => new Cluster(cluster))

export default db
