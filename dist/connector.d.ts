import { Client, ConnectorInterface, Invoice, ConfigDatabaseInterface } from "types";
export default class Connector implements ConnectorInterface {
    private dsn;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    execute(type: string): Promise<Client[] | Invoice[]>;
}
