import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {
  myStocks: new Datastore({filename: path.join(remote.app.getPath('userData'), 'db/myStocks.db', ), autoload: true}),
  smartSource: new Datastore({filename: path.join(remote.app.getPath('userData'), 'db/smartSource.db'), autoload: true})
}

export default {
  db
}
