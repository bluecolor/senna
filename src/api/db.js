const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/db.json')
const db = low(adapter)

db.defaults({ connections: [] }).write()
db.defaults({ app: {} }).write()

export {
  db
}
