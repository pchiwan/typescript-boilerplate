import * as fs from 'fs'
import { JSON_FILE_PATH } from './config'

export function readJson () {
  let rawdata = fs.readFileSync(JSON_FILE_PATH, 'utf8')
  return JSON.parse(rawdata)
}
