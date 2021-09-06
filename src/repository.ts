import {
  Client,
  Connector,
  Invoice,
  PaginationInterface,
  RepositoryInterface,
} from "sdz-agent-types";

export default class Repository implements RepositoryInterface {
  private connector: Connector;
  constructor(connector: Connector) {
    this.connector = connector;
  }
  async getClients(pagination: PaginationInterface): Promise<Client[]> {
    try {
      return this.connector.execute("clients", pagination) as Promise<Client[]>;
    } catch (e) {}
  }
  async getInvoices(pagination: PaginationInterface): Promise<Invoice[]> {
    try {
      return this.connector.execute("invoices", pagination) as Promise<
        Invoice[]
      >;
    } catch (e) {}
  }
}
