import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {
  myStocks: new Datastore({filename: path.join(remote.app.getPath('userData'), 'db/myStocks.db')}),
  smartSource: new Datastore({filename: path.join(remote.app.getPath('userData'), 'db/smartSource.db')})
}

export default {
  db
}
