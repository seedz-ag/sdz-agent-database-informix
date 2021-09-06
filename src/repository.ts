import {
  Connector,
  DatabaseRow,
  PaginationInterface,
  RepositoryInterface,
} from "sdz-agent-types";

export default class Repository implements RepositoryInterface {
  private connector: Connector;
  constructor(connector: Connector) {
    this.connector = connector;
  }
  async getClients(pagination: PaginationInterface): Promise<DatabaseRow[]> {
    try {
      return this.connector.execute("clients", pagination);
    } catch (e) {}
  }
  async getInvoices(pagination: PaginationInterface): Promise<DatabaseRow[]> {
    try {
      return this.connector.execute("invoices", pagination);
    } catch (e) {}
  }
}
