const jsonServer = require('json-server')
const low = require('lowdb')
const cors = require('cors')
const FileSync = require('lowdb/adapters/FileSync')
const server = jsonServer.create()
const port = 8080

const db = low(new FileSync('db.json'))
db.setState(require('./db/index.js'))

server.use((req, res, next) => {
  setTimeout(() => {
    next()
  }, Math.random() * 300 + 300)
})

server.use(cors())
server.use(jsonServer.bodyParser)

require('./routes')(server, db)

server.listen(port, () => {
  console.info(`Fake api is running on port ${port}`)
})
