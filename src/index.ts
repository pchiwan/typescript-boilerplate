import * as express from 'express'

const HTTP_OK = 200
const PORT = 3000

const app = express()

app.get('/', ((req, res) => {
  res.status(HTTP_OK)
  res.send('To infinity and beyond!')
}))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
