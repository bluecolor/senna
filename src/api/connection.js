var oracledb = require('oracledb')
const shortid = require('shortid')
import { db } from './db'

export default {
  async test ({ host, port, username, password, database }) {
    try {
      let con = await oracledb.getConnection({
        user: username,
        password: password,
        connectString: `${host}:${port}/${database}`
      })
      con.close()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  },
  create ({ name, host, port, username, password, database, serviceSid }) {
    const id = shortid.generate()
    db.get('connections')
      .push({ id, name, host, port, username, password, database, serviceSid })
      .write()
  },
  findAll () {
    return db.get('connections').value()
  }
}
