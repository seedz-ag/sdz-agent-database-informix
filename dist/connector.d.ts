import { Client, ConnectorInterface, Invoice, ConfigDatabaseInterface, PaginationInterface } from "sdz-agent-types";
export default class Connector implements ConnectorInterface {
    private dsn;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    execute(type: string, pagination: PaginationInterface): Promise<Client[] | Invoice[]>;
}
