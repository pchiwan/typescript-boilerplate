import * as express from 'express'

import router from './router'
import { PORT } from './config'

const app = express()
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
