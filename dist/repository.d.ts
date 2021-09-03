import { Client, Connector, Invoice, PaginationInterface, RepositoryInterface } from "types";
export default class Repository implements RepositoryInterface {
    private connector;
    constructor(connector: Connector);
    getClients(pagination: PaginationInterface): Promise<Client[] | void>;
    getInvoices(pagination: PaginationInterface): Promise<Invoice[] | void>;
}
