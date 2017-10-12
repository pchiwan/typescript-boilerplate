import * as fs from 'fs'
import { JSON_FILE_PATH } from './config'

const rawdata = fs.readFileSync(JSON_FILE_PATH, 'utf8')
const db = JSON.parse(rawdata)

export default db
