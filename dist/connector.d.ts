import { ConnectorInterface, ConfigDatabaseInterface, PaginationInterface, DatabaseRow } from "sdz-agent-types";
export default class Connector implements ConnectorInterface {
    private dsn;
    constructor(config: ConfigDatabaseInterface);
    connect(): void;
    close(): void;
    execute(type: string, pagination: PaginationInterface): Promise<DatabaseRow[]>;
}
