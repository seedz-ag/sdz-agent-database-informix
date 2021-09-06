import { Connector, DatabaseRow, PaginationInterface, RepositoryInterface } from "sdz-agent-types";
export default class Repository implements RepositoryInterface {
    private connector;
    constructor(connector: Connector);
    getClients(pagination: PaginationInterface): Promise<DatabaseRow[]>;
    getInvoices(pagination: PaginationInterface): Promise<DatabaseRow[]>;
}
