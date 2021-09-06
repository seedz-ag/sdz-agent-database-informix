import { Client, Connector, Invoice, PaginationInterface, RepositoryInterface } from "sdz-agent-types";
export default class Repository implements RepositoryInterface {
    private connector;
    constructor(connector: Connector);
    getClients(pagination: PaginationInterface): Promise<Client[]>;
    getInvoices(pagination: PaginationInterface): Promise<Invoice[]>;
}
