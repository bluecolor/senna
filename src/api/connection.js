import _ from 'lodash'
var oracledb = require('oracledb')
const shortid = require('shortid')
import { db } from './db'

const isNameUnique = (name, id) => {
  const connection = db.get('connections').find({ name })
  return _.isEmpty(connection) || connection.id === id
}

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
  async connect ({ username, password, host, port, database }) {
    let connection = await oracledb.getConnection({
      user: username,
      password: password,
      connectString: `${host}:${port}/${database}`
    })
    return connection
  },
  create ({ name, host, port, username, password, database, serviceSid }) {
    const id = shortid.generate()
    const data = { id, name, host, port, username, password, database, serviceSid }
    if (!isNameUnique(name)) {
      throw new Error('Name is not unique')
    }
    db.get('connections')
      .push(data)
      .write()
    return data
  },
  update ({ id, name, host, port, username, password, database, serviceSid }) {
    if (!isNameUnique(name, id)) {
      throw new Error('Name is not unique')
    }
    db.get('connections')
      .find({ id: id })
      .assign({ name, host, port, username, password, database, serviceSid })
      .write()
  },
  findAll () {
    return db.get('connections').cloneDeep().value()
  },
  destroy (id) {
    return db.get('connections').remove({ id: id }).write()
  }
}
