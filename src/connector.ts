import {
  ConnectorInterface,
  ConfigDatabaseInterface,
  PaginationInterface,
  DatabaseRow,
} from "sdz-agent-types";

import informix from "informixdb";

let informixConnect: any;
export default class Connector implements ConnectorInterface {
  private dsn: any;
  constructor(config: ConfigDatabaseInterface) {
    this.dsn = `SERVER=${config.server};DATABASE=${config.collation};HOST=${config.host};SERVICE=${config.port};UID=${config.username};PWD=${config.password};CLIENT_LOCALE=${config.locale}`;
  }
  connect() {
    if (!informixConnect) {
      try {
        informixConnect = informix.openSync(this.dsn);
      } catch (e) {
        console.log(e);
      }
    }
  }

  close() {
    if (informixConnect) {
      try {
        informixConnect.closeSync();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async execute(query: string): Promise<DatabaseRow[]> {
    let resultSet = [];
    if (!informixConnect) {
      this.connect();
    }
    try {
      resultSet = informixConnect.querySync(query);
      return resultSet;
    } catch (e) {
      console.log(e);
    }
  }
}
