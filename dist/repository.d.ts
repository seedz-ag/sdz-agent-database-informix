import { Connector, DatabaseRow, PaginationInterface, RepositoryInterface } from "sdz-agent-types";
export default class Repository implements RepositoryInterface {
    private connector;
    constructor(connector: Connector);
    getClients(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getInvoices(pagination: PaginationInterface): Promise<DatabaseRow[]>;
    getAddress(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getProperty(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getItem(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getItemBranding(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getItemGroup(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getRequest(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getRequestItem(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getBilling(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getPaymentType(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getProvider(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getAccountPay(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getAccountReceivable(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getVendor(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getEmployee(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getInventory(pagination: PaginationInterface, type: string): Promise<DatabaseRow[]>;
    getTest(pagination: PaginationInterface): Promise<DatabaseRow[]>;
}
