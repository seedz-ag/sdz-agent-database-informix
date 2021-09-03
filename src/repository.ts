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
  async getClients(pagination: PaginationInterface): Promise<Client[] | void> {
    try {
      return this.connector.execute("clients") as Promise<Client[]>;
    } catch (e) {}
  }
  async getInvoices(
    pagination: PaginationInterface
  ): Promise<Invoice[] | void> {
    try {
      return this.connector.execute("invoices") as Promise<Invoice[]>;
    } catch (e) {}
  }
}
